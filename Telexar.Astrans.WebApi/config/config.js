module.exports = {

    //"MONGODB_URL": "mongodb://ios_clovatel_user:1qaz2wsx@ionesoft.mine.nu:27017/Clovatel1929DBv12203",
    "MONGODB_URL": "mongodb://localhost:27017/ClovatelDB",
    "MONGODB_HISTORY_URL": "mongodb://ios_clovatel_user:1qaz2wsx@ionesoft.mine.nu:27017/ClovatelHistoryDB",
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
    },

    ReservationStatus: [{key: "Reserved", value: "RSV"},
        {key: "Arrival", value: "ARL"},
        {key: "Arrived", value: "ARD"},
        {key: "DayUse", value: "DU"},
        {key: "Departed", value: "DP"},
        {key: "StayOver", value: "SO"},
        {key: "Departed", value: "DP"},
        {key: "CheckedIn", value: "CHI"},
        {key: "CheckedOut", value: "CHO"}],

    PAYMENT_TRANSACTION_CODE:"PAY",
    
    REVENUE_TRANSACTION_CODE:"RV"
    

};
