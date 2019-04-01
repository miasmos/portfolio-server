import * as config from '../../config.json';
import * as pkg from '../../package.json';
import { Env } from './index';

interface IConfig {
    name: string;
    serviceName: string;
    port: number;
    loggerLevel: string;
    sendgrid: ISendgridConfig;
    cors: string[];
}

interface ISendgridConfig {
    apiKey: string;
    from: string;
    to: string;
    subject: string;
}

class ConfigClass implements IConfig {
    public sendgrid: ISendgridConfig;
    public debug: boolean;
    public name: string;
    public serviceName: string;
    public port: number;
    public loggerLevel: string;
    public cors: string[];

    public constructor() {
        this.debug = Env.isDev;
        this.serviceName = process.env.SERVICENAME || pkg.name;
        this.port = Number(process.env.PORT) || 3000;
        this.loggerLevel = this.debug ? 'debug' : '';
        Object.assign(this, this.debug ? config.development : config.production);
        this.name = pkg.name;
    }
}

export const Config = new ConfigClass();
