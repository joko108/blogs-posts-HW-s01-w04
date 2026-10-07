import { body } from "express-validator";

// Валидация поступающих от клиента полей (для POST и PUT запросов)
const titleValidation = body('title')
    .isString()
    .withMessage('Title should be string')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('shortDescription')
    .isString()
    .withMessage('Short description should be string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Length of short description is not correct');

const contentValidation = body('content')
    .isString()
    .withMessage('Content should be string')
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage('Length of content is not correct');

const blogIdValidation = body('blogId')
    .exists()
    .withMessage('Blog ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isMongoId()
    .withMessage('must be a Mongo ID');

export const postInputDtoValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
];

// Для эндпоинта /blogs/:blogId/posts — blogId берётся из URL, в body его нет
export const postInputDtoWithoutBlogIdValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
];

