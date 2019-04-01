import { Router } from 'express';
import { Respond } from '../../Respond';
import { ErrorMessage, ErrorCode, StatusCode } from '../../Enum';

export const Default = Router();

Default.get('/health', async (req, res) => {
    Respond.ok(res);
});

Default.all('/*', async (req, res) => {
    Respond.error(res, {
        message: ErrorMessage.NotFound,
        code: ErrorCode.NotFound,
        statusCode: StatusCode.NOT_FOUND
    });
});
