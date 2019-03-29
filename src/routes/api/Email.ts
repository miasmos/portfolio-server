import { Router, Request, Response } from 'express';
import { Respond, IResponse, IError, isError, RateLimitedHandler } from '../../Respond';
import { ErrorCode, ErrorMessage, StatusCode } from '../../Enum';
import { Validate } from '../../Validate';
import { Email as EmailService } from '../../services/Email';

import celebrateLib = require('celebrate');
import RateLimiter = require('express-rate-limit');

const { celebrate, Joi } = celebrateLib;
export const Email = Router();

export const send = async (sender: string, body: string): Promise<IResponse | IError> => {
    try {
        await EmailService.send(sender, body);
        return { success: true };
    } catch (error) {
        throw error;
    }
};

Email.post(
    '/email/send',
    new RateLimiter({
        windowMs: 1000 * 60 * 5,
        max: 2,
        handler: RateLimitedHandler
    }),
    celebrate({
        body: Joi.object().keys({
            body: Validate.Email.body,
            sender: Validate.Email.sender
        })
    }),
    async (req: Request, res: Response) => {
        const { body, sender } = req.body;

        try {
            const response: IError | IResponse = await send(sender!, body!);
            if (isError(response)) {
                Respond.error(res, response);
            } else {
                Respond.ok(res, response);
            }
        } catch (error) {
            Respond.error(res, {
                code: ErrorCode.Default
            });
        }
    }
);
