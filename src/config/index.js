// External Imports
require('dotenv').config();

// Environment Setup
module.exports = {
    PORT: process.env.PORT,
    MDB: process.env.MDB_URI,
    SECRET_KEY: process.env.SECRET_KEY,
};
