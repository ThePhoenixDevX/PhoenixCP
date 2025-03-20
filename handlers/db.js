const Keyv = require('keyv');
const db = new Keyv('sqlite://phoenixcp.db');

module.exports = { db }