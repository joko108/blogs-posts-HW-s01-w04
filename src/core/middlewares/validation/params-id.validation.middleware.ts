import { param } from "express-validator";

// Отдельный валидатор ID
export const idValidation = param('id')
    .exists()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isMongoId()
    .withMessage('must be a Mongo ID');

export const blogIdParamValidation = param('blogId')
    .exists()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isMongoId()
    .withMessage('must be a Mongo ID');
