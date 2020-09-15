/**
 * @preserve date-and-time.js locale configuration
 * @preserve Chinese (zh-cn)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('zh-cn', {
            res: {
                MMMM: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                MMM: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                dddd: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                ddd: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                dd: ['日', '一', '二', '三', '四', '五', '六'],
                A: ['凌晨', '早上', '上午', '中午', '下午', '晚上']
            },
            formatter: {
                A: function (d) {
                    var hm = d.getHours() * 100 + d.getMinutes();
                    if (hm < 600) {
                        return this.res.A[0];   // 凌晨
                    } else if (hm < 900) {
                        return this.res.A[1];   // 早上
                    } else if (hm < 1130) {
                        return this.res.A[2];   // 上午
                    } else if (hm < 1230) {
                        return this.res.A[3];   // 中午
                    } else if (hm < 1800) {
                        return this.res.A[4];   // 下午
                    }
                    return this.res.A[5];       // 晚上
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 4) {
                        return h;   // 凌晨, 早上, 上午, 中午
                    }
                    return h > 11 ? h : h + 12; // 下午, 晚上
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
