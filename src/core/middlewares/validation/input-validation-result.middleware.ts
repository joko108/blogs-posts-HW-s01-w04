import { ValidationError, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationErrorType, ValidationErrorDto } from "../../types/validation-error";
import { HttpStatus } from "../../types/http-statuses";

// Единый формат сообщения об ошибке
export const createErrorMessages = (
    errors: ValidationErrorType[]
): ValidationErrorDto => {
    return { errorsMessages: errors };
};

// Хелпер для мидлвара, приводящих ошибки к единому формату сообщения
const formatErrors = (error: ValidationError): ValidationErrorType => {
    if (error.type === 'field') {
        return ({ message: error.msg, field: error.path });
    }

    return ({ message: error.msg, field: '' });
}

// Мидлвар, компонующий ошибки и отправляющий их в респонсе
export const inputValidationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req)
        .formatWith(formatErrors)
        .array({ onlyFirstError: true }); // Если по одному полю несколько ошибок, уйдет только первая

    if (errors.length > 0) {

        console.log('Validation errors:', JSON.stringify(errors, null, 2)); // ← ВРЕМЕННАЯ СТРОКА
        console.log('Request URL:', req.originalUrl);
        console.log('Request query:', JSON.stringify(req.query));

        res.status(HttpStatus.BadRequest_400).json({ errorsMessages: errors });
        return;
    }

    next();
};
