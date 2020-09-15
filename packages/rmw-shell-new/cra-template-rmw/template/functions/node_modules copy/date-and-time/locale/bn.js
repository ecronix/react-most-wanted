/**
 * @preserve date-and-time.js locale configuration
 * @preserve Bengali (bn)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('bn', {
            res: {
                MMMM: ['জানুয়ারী', 'ফেবুয়ারী', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'অগাস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
                MMM: ['জানু', 'ফেব', 'মার্চ', 'এপর', 'মে', 'জুন', 'জুল', 'অগ', 'সেপ্ট', 'অক্টো', 'নভ', 'ডিসেম্'],
                dddd: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পত্তিবার', 'শুক্রবার', 'শনিবার'],
                ddd: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পত্তি', 'শুক্র', 'শনি'],
                dd: ['রব', 'সম', 'মঙ্গ', 'বু', 'ব্রিহ', 'শু', 'শনি'],
                A: ['রাত', 'সকাল', 'দুপুর', 'বিকাল']
            },
            formatter: {
                A: function (d) {
                    var h = d.getHours();
                    if (h < 4) {
                        return this.res.A[0];   // রাত
                    } else if (h < 10) {
                        return this.res.A[1];   // সকাল
                    } else if (h < 17) {
                        return this.res.A[2];   // দুপুর
                    } else if (h < 20) {
                        return this.res.A[3];   // বিকাল
                    }
                    return this.res.A[0];       // রাত
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 1) {
                        return h < 4 || h > 11 ? h : h + 12;    // রাত
                    } else if (a < 2) {
                        return h;                               // সকাল
                    } else if (a < 3) {
                        return h > 9 ? h : h + 12;              // দুপুর
                    }
                    return h + 12;                              // বিকাল
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
