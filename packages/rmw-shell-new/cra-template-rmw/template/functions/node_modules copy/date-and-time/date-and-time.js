/**
 * @preserve date-and-time.js (c) KNOWLEDGECODE | MIT
 */
(function (global) {
    'use strict';

    var date = {},
        locales = {},
        plugins = {},
        lang = 'en',
        _res = {
            MMMM: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dddd: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            A: ['AM', 'PM']
        },
        _formatter = {
            YYYY: function (d/*, formatString*/) { return ('000' + d.getFullYear()).slice(-4); },
            YY: function (d/*, formatString*/) { return ('0' + d.getFullYear()).slice(-2); },
            Y: function (d/*, formatString*/) { return '' + d.getFullYear(); },
            MMMM: function (d/*, formatString*/) { return this.res.MMMM[d.getMonth()]; },
            MMM: function (d/*, formatString*/) { return this.res.MMM[d.getMonth()]; },
            MM: function (d/*, formatString*/) { return ('0' + (d.getMonth() + 1)).slice(-2); },
            M: function (d/*, formatString*/) { return '' + (d.getMonth() + 1); },
            DD: function (d/*, formatString*/) { return ('0' + d.getDate()).slice(-2); },
            D: function (d/*, formatString*/) { return '' + d.getDate(); },
            HH: function (d/*, formatString*/) { return ('0' + d.getHours()).slice(-2); },
            H: function (d/*, formatString*/) { return '' + d.getHours(); },
            A: function (d/*, formatString*/) { return this.res.A[d.getHours() > 11 | 0]; },
            hh: function (d/*, formatString*/) { return ('0' + (d.getHours() % 12 || 12)).slice(-2); },
            h: function (d/*, formatString*/) { return '' + (d.getHours() % 12 || 12); },
            mm: function (d/*, formatString*/) { return ('0' + d.getMinutes()).slice(-2); },
            m: function (d/*, formatString*/) { return '' + d.getMinutes(); },
            ss: function (d/*, formatString*/) { return ('0' + d.getSeconds()).slice(-2); },
            s: function (d/*, formatString*/) { return '' + d.getSeconds(); },
            SSS: function (d/*, formatString*/) { return ('00' + d.getMilliseconds()).slice(-3); },
            SS: function (d/*, formatString*/) { return ('0' + (d.getMilliseconds() / 10 | 0)).slice(-2); },
            S: function (d/*, formatString*/) { return '' + (d.getMilliseconds() / 100 | 0); },
            dddd: function (d/*, formatString*/) { return this.res.dddd[d.getDay()]; },
            ddd: function (d/*, formatString*/) { return this.res.ddd[d.getDay()]; },
            dd: function (d/*, formatString*/) { return this.res.dd[d.getDay()]; },
            Z: function (d/*, formatString*/) { return d.utc ? '+0000' : /[\+-]\d{4}/.exec(d.toTimeString())[0]; },
            post: function (str) { return str; }
        },
        _parser = {
            YYYY: function (str/*, formatString */) { return this.exec(/^\d{4}/, str); },
            Y: function (str/*, formatString */) { return this.exec(/^\d{1,4}/, str); },
            MMMM: function (str/*, formatString */) {
                var result = this.find(this.res.MMMM, str);
                result.value++;
                return result;
            },
            MMM: function (str/*, formatString */) {
                var result = this.find(this.res.MMM, str);
                result.value++;
                return result;
            },
            MM: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            M: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            DD: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            D: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            HH: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            H: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            A: function (str/*, formatString */) { return this.find(this.res.A, str); },
            hh: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            h: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            mm: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            m: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            ss: function (str/*, formatString */) { return this.exec(/^\d\d/, str); },
            s: function (str/*, formatString */) { return this.exec(/^\d\d?/, str); },
            SSS: function (str/*, formatString */) { return this.exec(/^\d{1,3}/, str); },
            SS: function (str/*, formatString */) {
                var result = this.exec(/^\d\d?/, str);
                result.value *= 10;
                return result;
            },
            S: function (str/*, formatString */) {
                var result = this.exec(/^\d/, str);
                result.value *= 100;
                return result;
            },
            Z: function (str/*, formatString */) {
                var result = this.exec(/^[\+-]\d{2}[0-5]\d/, str);
                result.value = (result.value / 100 | 0) * -60 - result.value % 100;
                return result;
            },
            h12: function (h, a) { return (h === 12 ? 0 : h) + a * 12; },
            exec: function (re, str) {
                var result = (re.exec(str) || [''])[0];
                return { value: result | 0, length: result.length };
            },
            find: function (array, str) {
                var index = -1, length = 0;

                for (var i = 0, len = array.length, item; i < len; i++) {
                    item = array[i];
                    if (!str.indexOf(item) && item.length > length) {
                        index = i;
                        length = item.length;
                    }
                }
                return { value: index, length: length };
            },
            pre: function (str) { return str; }
        },
        customize = function (code, base, locale) {
            var extend = function (proto, props, res) {
                    var Locale = function (r) {
                        if (r) { this.res = r; }
                    };

                    Locale.prototype = proto;
                    Locale.prototype.constructor = Locale;

                    var newLocale = new Locale(res),
                        value;

                    for (var key in props || {}) {
                        value = props[key];
                        newLocale[key] = value.slice ? value.slice() : value;
                    }
                    return newLocale;
                },
                loc = { res: extend(base.res, locale.res) };

            loc.formatter = extend(base.formatter, locale.formatter, loc.res);
            loc.parser = extend(base.parser, locale.parser, loc.res);
            locales[code] = loc;
        };

    /**
     * compiling a format string
     * @param {string} formatString - a format string
     * @returns {Array.<string>} a compiled object
     */
    date.compile = function (formatString) {
        var re = /\[([^\[\]]*|\[[^\[\]]*\])*\]|([A-Za-z])\2+|\.{3}|./g, keys, pattern = [formatString];

        while ((keys = re.exec(formatString))) {
            pattern[pattern.length] = keys[0];
        }
        return pattern;
    };

    /**
     * formatting a date
     * @param {Date} dateObj - a Date object
     * @param {string|Array.<string>} arg - a format string or a compiled object
     * @param {boolean} [utc] - output as UTC
     * @returns {string} a formatted string
     */
    date.format = function (dateObj, arg, utc) {
        var pattern = typeof arg === 'string' ? date.compile(arg) : arg,
            d = date.addMinutes(dateObj, utc ? dateObj.getTimezoneOffset() : 0),
            formatter = locales[lang].formatter, str = '';

        d.utc = utc || false;
        for (var i = 1, len = pattern.length, token; i < len; i++) {
            token = pattern[i];
            str += formatter[token] ? formatter.post(formatter[token](d, pattern[0])) : token.replace(/\[(.*)]/, '$1');
        }
        return str;
    };

    /**
     * pre-parsing a date string
     * @param {string} dateString - a date string
     * @param {string|Array.<string>} arg - a format string or a compiled object
     * @returns {Object} a date structure
     */
    date.preparse = function (dateString, arg) {
        var pattern = typeof arg === 'string' ? date.compile(arg) : arg,
            dt = { Y: 1970, M: 1, D: 1, H: 0, A: 0, h: 0, m: 0, s: 0, S: 0, Z: 0, _index: 0, _length: 0, _match: 0 },
            parser = locales[lang].parser, offset = 0;

        dateString = parser.pre(dateString);
        for (var i = 1, len = pattern.length, token, result; i < len; i++) {
            token = pattern[i];
            if (parser[token]) {
                result = parser[token](dateString.slice(offset), pattern[0]);
                if (!result.length) {
                    break;
                }
                offset += result.length;
                dt[token.charAt(0)] = result.value;
                dt._match++;
            } else if (token === dateString.charAt(offset) || token === ' ') {
                offset++;
            } else if (/\[.*]/.test(token)) {
                offset += token.length - 2;
            } else if (token === '...') {
                offset = dateString.length;
                break;
            } else {
                break;
            }
        }
        dt.H = dt.H || parser.h12(dt.h, dt.A);
        dt._index = offset;
        dt._length = dateString.length;
        return dt;
    };

    /**
     * validation
     * @param {Object|string} arg1 - a date structure or a date string
     * @param {string|Array.<string>} [arg2] - a format string or a compiled object
     * @returns {boolean} whether the date string is a valid date
     */
    date.isValid = function (arg1, arg2) {
        var dt = typeof arg1 === 'string' ? date.preparse(arg1, arg2) : arg1,
            last = [31, 28 + date.isLeapYear(dt.Y) | 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][dt.M - 1];

        return !(
            dt._index < 1 || dt._length < 1 || dt._index - dt._length || dt._match < 1 ||
            dt.Y < 1 || dt.Y > 9999 || dt.M < 1 || dt.M > 12 || dt.D < 1 || dt.D > last ||
            dt.H < 0 || dt.H > 23 || dt.m < 0 || dt.m > 59 || dt.s < 0 || dt.s > 59 || dt.S < 0 || dt.S > 999 ||
            dt.Z < -720 || dt.Z > 840
        );
    };

    /**
     * parsing a date string
     * @param {string} dateString - a date string
     * @param {string|Array.<string>} arg - a format string or a compiled object
     * @param {boolean} [utc] - input as UTC
     * @returns {Date} a constructed date
     */
    date.parse = function (dateString, arg, utc) {
        var dt = date.preparse(dateString, arg);

        if (date.isValid(dt)) {
            dt.M -= dt.Y < 100 ? 22801 : 1; // 22801 = 1900 * 12 + 1
            if (utc || dt.Z) {
                return new Date(Date.UTC(dt.Y, dt.M, dt.D, dt.H, dt.m + dt.Z, dt.s, dt.S));
            }
            return new Date(dt.Y, dt.M, dt.D, dt.H, dt.m, dt.s, dt.S);
        }
        return new Date(NaN);
    };

    /**
     * adding years
     * @param {Date} dateObj - a date object
     * @param {number} years - number of years to add
     * @returns {Date} a date after adding the value
     */
    date.addYears = function (dateObj, years) {
        return date.addMonths(dateObj, years * 12);
    };

    /**
     * adding months
     * @param {Date} dateObj - a date object
     * @param {number} months - number of months to add
     * @returns {Date} a date after adding the value
     */
    date.addMonths = function (dateObj, months) {
        var d = new Date(dateObj.getTime());

        d.setMonth(d.getMonth() + months);
        return d;
    };

    /**
     * adding days
     * @param {Date} dateObj - a date object
     * @param {number} days - number of days to add
     * @returns {Date} a date after adding the value
     */
    date.addDays = function (dateObj, days) {
        var d = new Date(dateObj.getTime());

        d.setDate(d.getDate() + days);
        return d;
    };

    /**
     * adding hours
     * @param {Date} dateObj - a date object
     * @param {number} hours - number of hours to add
     * @returns {Date} a date after adding the value
     */
    date.addHours = function (dateObj, hours) {
        return date.addMinutes(dateObj, hours * 60);
    };

    /**
     * adding minutes
     * @param {Date} dateObj - a date object
     * @param {number} minutes - number of minutes to add
     * @returns {Date} a date after adding the value
     */
    date.addMinutes = function (dateObj, minutes) {
        return date.addSeconds(dateObj, minutes * 60);
    };

    /**
     * adding seconds
     * @param {Date} dateObj - a date object
     * @param {number} seconds - number of seconds to add
     * @returns {Date} a date after adding the value
     */
    date.addSeconds = function (dateObj, seconds) {
        return date.addMilliseconds(dateObj, seconds * 1000);
    };

    /**
     * adding milliseconds
     * @param {Date} dateObj - a date object
     * @param {number} milliseconds - number of milliseconds to add
     * @returns {Date} a date after adding the value
     */
    date.addMilliseconds = function (dateObj, milliseconds) {
        return new Date(dateObj.getTime() + milliseconds);
    };

    /**
     * subtracting
     * @param {Date} date1 - a Date object
     * @param {Date} date2 - a Date object
     * @returns {Object} a result object subtracting date2 from date1
     */
    date.subtract = function (date1, date2) {
        var delta = date1.getTime() - date2.getTime();

        return {
            toMilliseconds: function () {
                return delta;
            },
            toSeconds: function () {
                return delta / 1000;
            },
            toMinutes: function () {
                return delta / 60000;
            },
            toHours: function () {
                return delta / 3600000;
            },
            toDays: function () {
                return delta / 86400000;
            }
        };
    };

    /**
     * leap year
     * @param {number} y - year
     * @returns {boolean} whether the year is a leap year
     */
    date.isLeapYear = function (y) {
        return (!(y % 4) && !!(y % 100)) || !(y % 400);
    };

    /**
     * comparison of two dates
     * @param {Date} date1 - a Date object
     * @param {Date} date2 - a Date object
     * @returns {boolean} whether the dates are the same day (times are ignored)
     */
    date.isSameDay = function (date1, date2) {
        return date1.toDateString() === date2.toDateString();
    };

    /**
     * change locale or setting a new locale definition
     * @param {string} [code] - language code
     * @param {Object} [locale] - locale definition
     * @returns {string} current language code
     */
    date.locale = function (code, locale) {
        if (locale) {
            customize(code, { res: _res, formatter: _formatter, parser: _parser }, locale);
        } else if (code) {
            lang = code;
        }
        return lang;
    };

    /**
     * locale extension
     * @param {Object} extension - locale extension
     * @returns {void}
     */
    date.extend = function (extension) {
        var extender = extension.extender || {};

        for (var key in extender) {
            if (!date[key]) {
                date[key] = extender[key];
            }
        }
        if (extension.formatter || extension.parser || extension.res) {
            customize(lang, locales[lang], extension);
        }
    };

    /**
     * plugin import or definition
     * @param {string} name - plugin name
     * @param {Object} [extension] - locale extension
     * @returns {void}
     */
    date.plugin = function (name, extension) {
        plugins[name] = plugins[name] || extension;
        if (!extension && plugins[name]) {
            date.extend(plugins[name]);
        }
    };

    // Create default locale (English)
    date.locale(lang, {});

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = date;
    } else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return date;
        });
    } else {
        global.date = date;
    }

}(this));
