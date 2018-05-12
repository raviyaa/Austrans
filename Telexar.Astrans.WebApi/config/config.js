module.exports = {
   
    "POOL_SIZE": 10,
    "JWT_SECRET": "JWT_SECRET",
    "WEB_SERVER_PORT": 4007,
    "TOKEN_EXPIRATION_IN_MILLIS": 5184000000,
    "DEFAULT_SORT_TYPE": "_id",
    "DEFAULT_LIMIT": 10,
    "DEFAULT_SORT_ORDER": "desc",

    
    /**
     * Configures Logging level for winston logger
     */
    LOGGING_LEVEL: 'debug',

    /**
     * Configures logging file for winston logging
     */
    LOG_FILE: './logs/all-logs.log',

    /**
     * Configure number of records returned in request
     * Used for pagination/offset
     */
    RECORDS_PER_REQUEST: 10,
    /**
     * generate a salt with bcript
     */
    SALT_WORK_FACTOR: 10,

    /**
     * Configure secret and other parameters related to JSON
     * webtokens
     */
    WEB_TOKEN_CONFIG: {
        tokenSecret: 'secret',
        /**
         * Role Wise token Config where required
         * expiry for token be configured
         */
        tokenConfig: {
            user: {
                expiresInMinutes: 1440
            }
        }
    }

};
