import {body} from 'express-validator'

export const nameValidator = [
  body('first_name')
  .custom((value) => /^[A-Z]/.test(value)) 
  .withMessage('The first character of first_name must be alphabetic')
  .isAlpha() 
  .withMessage('The first_name can only contain alphabetic characters'),
  
  body('last_name')
  .custom((value) => /^[A-Z]/.test(value)) 
  .withMessage('The first character of first_name must be alphabetic')
  .isAlpha() 
  .withMessage('The first_name can only contain alphabetic characters'),
];