import { Request, Response } from 'express';

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
) => {
    console.error("Error caught by global error handler")
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};
