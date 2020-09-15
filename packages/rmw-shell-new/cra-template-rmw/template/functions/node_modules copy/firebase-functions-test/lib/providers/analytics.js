"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2018 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
/** Create an AnalyticsEvent */
function makeAnalyticsEvent(
/** Fields of AnalyticsEvent that you'd like to specify. */
fields) {
    const template = {
        reportingDate: '',
        name: '',
        params: {},
        logTime: '',
    };
    return Object.assign(template, fields);
}
exports.makeAnalyticsEvent = makeAnalyticsEvent;
/** Fetch an example AnalyticsEvent already populated with data. */
function exampleAnalyticsEvent() {
    return {
        reportingDate: '20170202',
        name: 'Loaded_In_Background',
        params: {
            build: '1350',
            calls_remaining: 10,
            fraction_calls_dropped: 0.0123456,
            average_call_rating: 4.5,
        },
        logTime: '2017-02-02T23:06:26.124Z',
        previousLogTime: '2017-02-02T23:01:19.797Z',
        valueInUSD: 1234.5,
        user: {
            userId: 'abcdefghijklmnop!',
            appInfo: {
                appId: 'com.appName',
                appInstanceId: 'E3C9939401814B9B954725A740B8C7BC',
                appPlatform: 'IOS',
                appStore: 'iTunes',
                appVersion: '5.2.0',
            },
            bundleInfo: {
                bundleSequenceId: 6034,
                serverTimestampOffset: 371,
            },
            deviceInfo: {
                deviceCategory: 'mobile',
                deviceModel: 'iPhone7,2',
                deviceTimeZoneOffsetSeconds: -21600,
                mobileBrandName: 'Apple',
                mobileMarketingName: 'iPhone 6',
                mobileModelName: 'iPhone 6',
                platformVersion: '10.2.1',
                userDefaultLanguage: 'en-us',
                deviceId: '599F9C00-92DC-4B5C-9464-7971F01F8370',
                resettableDeviceId: '599F9C00-92DC-4B5C-9464-7971F01F8370',
                limitedAdTracking: true,
            },
            firstOpenTime: '2016-04-28T15:00:35.819Z',
            geoInfo: {
                city: 'Plano',
                continent: '021',
                country: 'United States',
                region: 'Texas',
            },
            userProperties: {
                build: {
                    setTime: '2017-02-02T23:06:26.090Z',
                    value: '1350',
                },
                calls_remaining: {
                    setTime: '2017-02-02T23:06:26.094Z',
                    value: '10',
                },
                version: {
                    setTime: '2017-02-02T23:06:26.085Z',
                    value: '5.2.0',
                },
            },
        },
    };
}
exports.exampleAnalyticsEvent = exampleAnalyticsEvent;
