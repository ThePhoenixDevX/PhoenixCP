const { db } = require('../handlers/db.js');
const config = require('../config.json');
const { v4: uuidv4 } = require('uuid');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();

async function init() {
    const PhoenixCP = await db.get('PhoenixCP_instance');
    if (!PhoenixCP) {
        log.init('this is probably your first time starting PhoenixCP, welcome!');
        log.init('you can find documentation for the panel at https://hydrenllc.us.kg');

        let imageCheck = await db.get('images');
        if (!imageCheck) {
            log.error('before starting PhoenixCP for the first time, you didn\'t run the seed command!');
            log.error('please run: npm run seed');
            log.error('if you didn\'t do it already, make a user for yourself: npm run createUser');
            process.exit();
        }

        let PhoenixCPID = uuidv4();
        let setupTime = Date.now();
        
        let info = {
            PhoenixCPID: PhoenixCPID,
            setupTime: setupTime,
            originalVersion: config.version
        }

        await db.set('PhoenixCP_instance', info)
        log.info('initialized PhoenixCP panel with id: ' + PhoenixCPID)
    }        

    log.info('init complete!')
}

module.exports = { init }