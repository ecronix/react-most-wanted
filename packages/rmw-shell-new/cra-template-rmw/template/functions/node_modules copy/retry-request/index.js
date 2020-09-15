'use strict';

var through = require('through2');
var debug = require('debug')('retry-request');

var DEFAULTS = {
  objectMode: false,
  retries: 2,
  noResponseRetries: 2,
  currentRetryAttempt: 0,
  shouldRetryFn: function (response) {
    var retryRanges = [
      // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      // 1xx - Retry (Informational, request still processing)
      // 2xx - Do not retry (Success)
      // 3xx - Do not retry (Redirect)
      // 4xx - Do not retry (Client errors)
      // 429 - Retry ("Too Many Requests")
      // 5xx - Retry (Server errors)
      [100, 199],
      [429, 429],
      [500, 599]
    ];

    var statusCode = response.statusCode;
    debug(`Response status: ${statusCode}`);

    var range;
    while ((range = retryRanges.shift())) {
      if (statusCode >= range[0] && statusCode <= range[1]) {
        // Not a successful status or redirect.
        return true;
      }
    }
  }
};

function retryRequest(requestOpts, opts, callback) {
  var streamMode = typeof arguments[arguments.length - 1] !== 'function';

  if (typeof opts === 'function') {
    callback = opts;
  }

  opts = opts || DEFAULTS;

  if (typeof opts.objectMode === 'undefined') {
    opts.objectMode = DEFAULTS.objectMode;
  }
  if (typeof opts.request === 'undefined') {
    try {
      opts.request = require('request');
    } catch (e) {
      throw new Error('A request library must be provided to retry-request.');
    }
  }
  if (typeof opts.retries !== 'number') {
    opts.retries = DEFAULTS.retries;
  }
  if (typeof opts.currentRetryAttempt !== 'number') {
    opts.currentRetryAttempt = DEFAULTS.currentRetryAttempt;
  }
  if (typeof opts.noResponseRetries !== 'number') {
    opts.noResponseRetries = DEFAULTS.noResponseRetries;
  }
  if (typeof opts.shouldRetryFn !== 'function') {
    opts.shouldRetryFn = DEFAULTS.shouldRetryFn;
  }

  var currentRetryAttempt = opts.currentRetryAttempt;

  var numNoResponseAttempts = 0;
  var streamResponseHandled = false;

  var retryStream;
  var requestStream;
  var delayStream;

  var activeRequest;
  var retryRequest = {
    abort: function () {
      if (activeRequest && activeRequest.abort) {
        activeRequest.abort();
      }
    }
  };

  if (streamMode) {
    retryStream = through({ objectMode: opts.objectMode });
    retryStream.abort = resetStreams;
  }

  if (currentRetryAttempt > 0) {
    retryAfterDelay(currentRetryAttempt);
  } else {
    makeRequest();
  }

  if (streamMode) {
    return retryStream;
  } else {
    return retryRequest;
  }

  function resetStreams() {
    delayStream = null;

    if (requestStream) {
      requestStream.abort && requestStream.abort();
      requestStream.cancel && requestStream.cancel();

      if (requestStream.destroy) {
        requestStream.destroy();
      } else if (requestStream.end) {
        requestStream.end();
      }
    }
  }

  function makeRequest() {
    currentRetryAttempt++;
    debug(`Current retry attempt: ${currentRetryAttempt}`);

    if (streamMode) {
      streamResponseHandled = false;

      delayStream = through({ objectMode: opts.objectMode });
      requestStream = opts.request(requestOpts);

      setImmediate(function () {
        retryStream.emit('request');
      });

      requestStream
        // gRPC via google-cloud-node can emit an `error` as well as a `response`
        // Whichever it emits, we run with-- we can't run with both. That's what
        // is up with the `streamResponseHandled` tracking.
        .on('error', function (err) {
          if (streamResponseHandled) {
            return;
          }

          streamResponseHandled = true;
          onResponse(err);
        })
        .on('response', function (resp, body) {
          if (streamResponseHandled) {
            return;
          }

          streamResponseHandled = true;
          onResponse(null, resp, body);
        })
        .on('complete', retryStream.emit.bind(retryStream, 'complete'));

      requestStream.pipe(delayStream);
    } else {
      activeRequest = opts.request(requestOpts, onResponse);
    }
  }

  function retryAfterDelay(currentRetryAttempt) {
    if (streamMode) {
      resetStreams();
    }

    var nextRetryDelay = getNextRetryDelay(currentRetryAttempt);
    debug(`Next retry delay: ${nextRetryDelay}`);

    setTimeout(makeRequest, nextRetryDelay);
  }

  function onResponse(err, response, body) {
    // An error such as DNS resolution.
    if (err) {
      numNoResponseAttempts++;

      if (numNoResponseAttempts <= opts.noResponseRetries) {
        retryAfterDelay(numNoResponseAttempts);
      } else {
        if (streamMode) {
          retryStream.emit('error', err);
          retryStream.end();
        } else {
          callback(err, response, body);
        }
      }

      return;
    }

    // Send the response to see if we should try again.
    if (currentRetryAttempt <= opts.retries && opts.shouldRetryFn(response)) {
      retryAfterDelay(currentRetryAttempt);
      return;
    }

    // No more attempts need to be made, just continue on.
    if (streamMode) {
      retryStream.emit('response', response);
      delayStream.pipe(retryStream);
      requestStream.on('error', function (err) {
        retryStream.destroy(err);
      });
    } else {
      callback(err, response, body);
    }
  }
}

module.exports = retryRequest;

function getNextRetryDelay(retryNumber) {
  return (Math.pow(2, retryNumber) * 1000) + Math.floor(Math.random() * 1000);
}

module.exports.getNextRetryDelay = getNextRetryDelay;
