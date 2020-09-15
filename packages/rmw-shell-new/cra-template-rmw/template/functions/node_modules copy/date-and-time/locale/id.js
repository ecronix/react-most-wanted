/**
 * @preserve date-and-time.js locale configuration
 * @preserve Indonesian (id)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('id', {
            res: {
                MMMM: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
                dddd: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
                ddd: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
                dd: ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'],
                A: ['pagi', 'siang', 'sore', 'malam']
            },
            formatter: {
                A: function (d) {
                    var h = d.getHours();
                    if (h < 11) {
                        return this.res.A[0];   // pagi
                    } else if (h < 15) {
                        return this.res.A[1];   // siang
                    } else if (h < 19) {
                        return this.res.A[2];   // sore
                    }
                    return this.res.A[3];       // malam
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 1) {
                        return h;                       // pagi
                    } else if (a < 2) {
                        return h >= 11 ? h : h + 12;    // siang
                    }
                    return h + 12;                      // sore, malam
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
