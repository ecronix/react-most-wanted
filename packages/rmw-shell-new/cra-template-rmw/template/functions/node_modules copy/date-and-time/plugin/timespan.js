(function (global) {
    'use strict';

    var exec = function (date) {
        var timeSpan = function (date1, date2) {
            var milliseconds = function (dt, time) {
                    dt.S = time;
                    return dt;
                },
                seconds = function (dt, time) {
                    dt.s = time / 1000 | 0;
                    return milliseconds(dt, Math.abs(time) % 1000);
                },
                minutes = function (dt, time) {
                    dt.m = time / 60000 | 0;
                    return seconds(dt, Math.abs(time) % 60000);
                },
                hours = function (dt, time) {
                    dt.H = time / 3600000 | 0;
                    return minutes(dt, Math.abs(time) % 3600000);
                },
                days = function (dt, time) {
                    dt.D = time / 86400000 | 0;
                    return hours(dt, Math.abs(time) % 86400000);
                },
                format = function (dt, formatString) {
                    var pattern = date.compile(formatString);
                    var str = '';

                    for (var i = 1, len = pattern.length, token, value; i < len; i++) {
                        token = pattern[i].charAt(0);
                        if (token in dt) {
                            value = '' + Math.abs(dt[token]);
                            while (value.length < pattern[i].length) {
                                value = '0' + value;
                            }
                            if (dt[token] < 0) {
                                value = '-' + value;
                            }
                            str += value;
                        } else {
                            str += pattern[i].replace(/\[(.*)]/, '$1');
                        }
                    }
                    return str;
                },
                delta = date1.getTime() - date2.getTime();

            return {
                toMilliseconds: function (formatString) {
                    return format(milliseconds({}, delta), formatString);
                },
                toSeconds: function (formatString) {
                    return format(seconds({}, delta), formatString);
                },
                toMinutes: function (formatString) {
                    return format(minutes({}, delta), formatString);
                },
                toHours: function (formatString) {
                    return format(hours({}, delta), formatString);
                },
                toDays: function (formatString) {
                    return format(days({}, delta), formatString);
                }
            };
        };

        date.plugin('timespan', { extender: { timeSpan: timeSpan } });
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        (module.paths || []).push('./');
        exec(require('date-and-time'));
    } else if (typeof define === 'function' && define.amd) {
        define(['date-and-time'], exec);
    } else {
        exec(global.date);
    }

}(this));
