import { Router } from 'express';
import { Respond } from '../../Respond';
import { ErrorMessage, ErrorCode, StatusCode } from '../../Enum';

export const Default = Router();

Default.all('/*', async (req, res) => {
    Respond.error(res, {
        message: ErrorMessage.NotFound,
        code: ErrorCode.NotFound,
        statusCode: StatusCode.NOT_FOUND
    });
});
