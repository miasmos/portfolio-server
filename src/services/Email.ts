import { Config } from '../Config';

import sendgrid = require('@sendgrid/mail');

class EmailClass {
    public constructor() {
        sendgrid.setApiKey(Config.sendgrid.apiKey);
    }

    public send(sender: string, body: string): Promise<any> {
        return sendgrid.send({
            to: Config.sendgrid.to,
            from: Config.sendgrid.from,
            subject: `${sender} ${Config.sendgrid.subject}`,
            text: body
        });
    }
}

export const Email = new EmailClass();
