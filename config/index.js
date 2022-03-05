"use strict";
/**
 *        @file index.js
 *     @summary Server-specific configuration settings for the APIs.
 * @description This is an example of the config file which holds all the confidential credentials.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPasswordLength = exports.email = exports.bcrypt = exports.server = exports.dbObj = void 0;
/**
 * Database Connection Profile (Primary)
 * PostgreSQL database connection profile (object), used to make a privilaged server-side (non-application)
 * connection to the InnVoyce database.
 */
exports.dbObj = {
    user: "db_username",
    password: "db_password",
    database: "db_dbname",
    host: "db_host",
    port: 5432,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 10000,
};
/**
 * Server Configuration
 * Configurable server object required by the API include settings for the server port (port), a UUID
 * used to encode the authorization token (apiUuid), and the duration of that token (tokenExpiration).
 */
exports.server = {
    port: 9000,
    apiUuid: "2d0973cd-6528-4674-8d5a-10a7d21c5a4c",
    tokenExpiration: {
        days: 1,
        hours: 8,
        minutes: 0,
        seconds: 0,
    },
};
exports.bcrypt = {
    saltRounds: 10,
};
/**
 * Email Configuration
 */
exports.email = {
    primary: {
        token: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        from: "support@geekyants.com",
    },
    addresses: {
        support: "support@geekyants.com",
    },
};
/**
 * Generate a random password of your desired
 * length.
 */
exports.randomPasswordLength = 16;
