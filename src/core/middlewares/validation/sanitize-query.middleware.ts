import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

export const sanitizeQueryParams = (req: Request, _res: Response, next: NextFunction) => {
    const sanitized = matchedData(req, {
        locations: ['query'],
        includeOptionals: true
    });

    Object.defineProperty(req, 'query', {
        value: { ...req.query, ...sanitized },
        configurable: true,
        enumerable: true,
        writable: false,
    });

    next();
};
