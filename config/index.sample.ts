/**
 *        @file index.sample.js
 *     @summary Server-specific configuration settings for the APIs.
 * @description This is an example of the config file which holds all the confidential credentials.
 */

interface dbClient {
  user: string;
  password: string | undefined;
  database: string;
  host: string;
  port: number;
  ssl: boolean;
  max: number;
  idleTimeoutMillis: number;
}

/**
 * Database Connection Profile (Primary)
 * PostgreSQL database connection profile (object), used to make a privilaged server-side (non-application)
 * connection to the InnVoyce database.
 */
export const dbObj: dbClient = {
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
export const server = {
  port: 9000,
  apiUuid: "0eb14adc-a16e-400c-8f55-7d6c016bb36d",
  tokenExpiration: {
    days: 1,
    hours: 8,
    minutes: 0,
    seconds: 0,
  },
};

export const bcrypt = {
  saltRounds: 10,
};

/**
 * Email Configuration
 */

export const email = {
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

export const randomPasswordLength = 16;
