const pgp = require('pg-promise')(/* options */)
require('dotenv').config()

var local_db_key = process.env.LOCAL_KEY;
var neon_db_key = process.env.NEON_DB_KEY;

const db = pgp(neon_db_key);

module.exports = db;