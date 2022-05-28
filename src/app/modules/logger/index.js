const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { format } = winston;
const { combine, timestamp, prettyPrint, errors } = format;

const fs = require('fs');
const util = require('util');
const path = require('path');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const transport = new DailyRotateFile({
    datePattern: 'YYYY-MM-DD',
    dirname: 'logs'
});

const logger = winston.createLogger({
    format: combine(
        errors({ stack: true }),
        timestamp(),
        prettyPrint(),
        format.json()
    ),
    json: true,
    transports: [transport]
});

logger.getLogDates = async () => {
    const destination = path.join(__dirname, '../../../../logs');
    const files = await readdir(destination, { withFileTypes: true });
    return files.filter(file => !file.isDirectory())
        .map(file => file.name.split('.')[2]);
}

logger.getLogsByDate = async (date) => {

    const destination = path.join(__dirname, `../../../../logs/winston.log.${date}`);
    const file = await readFile(destination, 'utf8');
    const logs = file.split('\n');
    const parsedLogs = [];
    for (const log of logs) {
        try {
            parsedLogs.push(JSON.parse(log));
        } catch (e) { }
    }

    return {
        date,
        totalLogs: parsedLogs.length,
        logs: parsedLogs
    };
}

module.exports = logger;