"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const analytics = require("./providers/analytics");
const auth = require("./providers/auth");
const crashlytics = require("./providers/crashlytics");
const database = require("./providers/database");
const firestore = require("./providers/firestore");
const pubsub = require("./providers/pubsub");
const storage = require("./providers/storage");
exports.features = {
    mockConfig: main_1.mockConfig,
    wrap: main_1.wrap,
    makeChange: main_1.makeChange,
    analytics,
    auth,
    crashlytics,
    database,
    firestore,
    pubsub,
    storage,
};
