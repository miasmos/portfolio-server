import * as dotenv from 'dotenv';

import pkgData = require('../package.json');
import configData = require('../config.json');

dotenv.config({ path: '.env' });

interface IConfig {
    serviceName: string;
    port: number;
    loggerLevel: string;
    sendgrid: {
        apiKey: string;
        from: string;
        to: string;
        subject: string;
    };
}

export const Config: IConfig = {
    serviceName: process.env.SERVICENAME || pkgData.name,
    port: Number(process.env.PORT) || 3000,
    loggerLevel: 'debug',
    sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY!,
        from: configData.sendgrid.from,
        to: configData.sendgrid.to,
        subject: configData.sendgrid.subject
    }
};
