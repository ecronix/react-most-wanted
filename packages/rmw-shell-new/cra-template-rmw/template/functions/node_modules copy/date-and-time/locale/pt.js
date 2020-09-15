/**
 * @preserve date-and-time.js locale configuration
 * @preserve Portuguese (pt)
 * @preserve It is using moment.js locale configuration as a reference.
 */
(function (global) {
    'use strict';

    var exec = function (date) {
        date.locale('pt', {
            res: {
                MMMM: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                MMM: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                dddd: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
                ddd: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                dd: ['Dom', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sáb'],
                A: ['da madrugada', 'da manhã', 'da tarde', 'da noite']
            },
            formatter: {
                A: function (d) {
                    var h = d.getHours();
                    if (h < 5) {
                        return this.res.A[0];   // da madrugada
                    } else if (h < 12) {
                        return this.res.A[1];   // da manhã
                    } else if (h < 19) {
                        return this.res.A[2];   // da tarde
                    }
                    return this.res.A[3];       // da noite
                }
            },
            parser: {
                h12: function (h, a) {
                    if (a < 2) {
                        return h;   // da madrugada, da manhã
                    }
                    return h > 11 ? h : h + 12; // da tarde, da noite
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
