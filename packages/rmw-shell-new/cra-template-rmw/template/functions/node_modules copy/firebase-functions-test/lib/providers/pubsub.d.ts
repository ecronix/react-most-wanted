import { pubsub } from 'firebase-functions';
/** Create a Message from a JSON object. */
export declare function makeMessage(
/** Content of message. */
json: {
    [key: string]: any;
}, 
/** Optional Pubsub message attributes. */
attributes?: {
    [key: string]: string;
}): pubsub.Message;
/** Create a Message from a base-64 encoded string. */
export declare function makeMessage(
/** Base-64 encoded message string. */
encodedString: string, 
/** Optional Pubsub message attributes. */
attributes?: {
    [key: string]: string;
}): pubsub.Message;
/** Fetch an example Message already populated with data. */
export declare function exampleMessage(): pubsub.Message;
