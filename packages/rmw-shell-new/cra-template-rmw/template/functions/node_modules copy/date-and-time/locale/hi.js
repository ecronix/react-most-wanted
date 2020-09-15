/**
 * @preserve date-and-time.js locale configuration
 * @preserve Hindi (hi)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('hi', {
            res: {
                MMMM: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर'],
                MMM: ['जन.', 'फ़र.', 'मार्च', 'अप्रै.', 'मई', 'जून', 'जुल.', 'अग.', 'सित.', 'अक्टू.', 'नव.', 'दिस.'],
                dddd: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरूवार', 'शुक्रवार', 'शनिवार'],
                ddd: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरू', 'शुक्र', 'शनि'],
                dd: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
                A: ['रात', 'सुबह', 'दोपहर', 'शाम']
            },
            formatter: {
                A: function (d) {
                    var h = d.getHours();
                    if (h < 4) {
                        return this.res.A[0];   // रात
                    } else if (h < 10) {
                        return this.res.A[1];   // सुबह
                    } else if (h < 17) {
                        return this.res.A[2];   // दोपहर
                    } else if (h < 20) {
                        return this.res.A[3];   // शाम
                    }
                    return this.res.A[0];       // रात
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 1) {
                        return h < 4 || h > 11 ? h : h + 12;    // रात
                    } else if (a < 2) {
                        return h;                               // सुबह
                    } else if (a < 3) {
                        return h > 9 ? h : h + 12;              // दोपहर
                    }
                    return h + 12;                              // शाम
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
