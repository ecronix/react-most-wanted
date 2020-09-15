declare module 'retry-request' {
  import * as request from 'request';

  namespace retryRequest {
    function getNextRetryDelay(retryNumber: number): void;
    interface Options {
      objectMode?: boolean,
      request?: typeof request,
      retries?: number,
      noResponseRetries?: number,
      currentRetryAttempt?: number,
      shouldRetryFn?: (response: request.RequestResponse) => boolean
    }
  }

  function retryRequest(requestOpts: request.Options, opts: retryRequest.Options, callback?: request.RequestCallback)
    : { abort: () => void };
  function retryRequest(requestOpts: request.Options, callback?: request.RequestCallback)
    : { abort: () => void };

  export = retryRequest;
}
