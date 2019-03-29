import { createLogger, format, transports } from 'winston';
import { Config } from '../Config';

const { combine, timestamp, printf } = format;
export const LoggerFormat = printf(info => `${info.timestamp} | ${info.level}: ${info.message}`);

export const Logger = createLogger({
    level: Config.loggerLevel,
    format: combine(format.colorize(), timestamp(), LoggerFormat),
    transports: [new transports.Console()]
});
