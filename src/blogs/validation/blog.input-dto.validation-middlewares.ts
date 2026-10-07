import { body } from "express-validator";

// Валидация поступающих от клиента полей (для POST и PUT запросов)
const nameValidation = body('name')
    .isString()
    .withMessage('Name should be a string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Length of name is not correct');

const descriptionValidation = body('description')
    .isString()
    .withMessage('Description should be a string')
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Length of description is not correct');

const websiteUrlValidation = body('websiteUrl')
    .isString()
    .withMessage('Website Url should be a string')
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Length of website Url is not correct')
    .isURL()
    .withMessage('Invalid format URL')

export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
];
