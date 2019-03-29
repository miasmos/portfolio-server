import { Response, Request } from 'express';
import { StatusCode, ErrorMessage, ErrorCode } from './Enum';
import { Env } from './utils';

export interface IResponse {
    statusCode?: number;
    success?: boolean;
    error?: string | undefined;
}

export interface IError {
    code: number;
    message?: string;
    statusCode?: number;
}

export const isError = (value: any): value is IError =>
    typeof (value as IError).code !== 'undefined';

export class Respond {
    public static ok(res: Response, data: IResponse = {}): void {
        let statusCode = StatusCode.OK;
        if ('statusCode' in data && typeof data.statusCode !== 'undefined') {
            statusCode = data.statusCode;
        }

        res.status(statusCode).json({
            ...data,
            statusCode,
            success: true,
            error: undefined
        });
    }

    public static error(res: Response, error: IError, data: IResponse = {}): void {
        let statusCode = StatusCode.INTERNAL_ERROR;
        if ('statusCode' in error && typeof error.statusCode !== 'undefined') {
            statusCode = error.statusCode;
        } else if ('statusCode' in data && typeof data.statusCode !== 'undefined') {
            statusCode = data.statusCode;
        }

        const response = {
            ...data,
            statusCode,
            code: error.code,
            success: false,
            message: ''
        };
        if (Env.isDev && 'message' in error && typeof error.message !== 'undefined') {
            response.message = error.message;
        }
        res.status(statusCode).json(response);
    }
}

export const RateLimitedHandler = (req: Request, res: Response): void =>
    Respond.error(res, {
        code: ErrorCode.RateLimited,
        message: ErrorMessage.RateLimited,
        statusCode: StatusCode.RATE_LIMITED
    });
