/**
 * @preserve date-and-time.js locale configuration
 * @preserve Polish (pl)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('pl', {
            res: {
                MMMM_nominative: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'],
                MMMM_subjective: ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'],
                MMM: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
                dddd: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'],
                ddd: ['nie', 'pon', 'wt', 'śr', 'czw', 'pt', 'sb'],
                dd: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So']
            },
            formatter: {
                MMMM: function (d, formatString) {
                    return this.res['MMMM_' + (/D MMMM/.test(formatString) ? 'subjective' : 'nominative')][d.getMonth()];
                }
            },
            parser: {
                MMMM: function (str, formatString) {
                    var result = this.find(this.res['MMMM_' + (/D MMMM/.test(formatString) ? 'subjective' : 'nominative')], str);
                    result.value++;
                    return result;
                }
            }
        });
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
