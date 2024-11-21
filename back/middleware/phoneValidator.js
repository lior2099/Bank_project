import {body} from 'express-validator'

export const phoneValidator = [
  body('phone_number', 'The phone length is not from isreal').isMobilePhone('he-IL'),
]