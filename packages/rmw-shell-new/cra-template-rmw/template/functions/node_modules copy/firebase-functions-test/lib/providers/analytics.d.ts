import { analytics } from 'firebase-functions';
/** Create an AnalyticsEvent */
export declare function makeAnalyticsEvent(
/** Fields of AnalyticsEvent that you'd like to specify. */
fields: {
    [key: string]: string;
}): analytics.AnalyticsEvent;
/** Fetch an example AnalyticsEvent already populated with data. */
export declare function exampleAnalyticsEvent(): analytics.AnalyticsEvent;
