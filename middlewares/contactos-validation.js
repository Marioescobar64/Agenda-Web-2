import { body, param } from "express-validator";

import { checkValidators } from "./check-validation.js";

// Validaciones para crear campos (field)
export const validateCreateContacto = [
    body('contactosName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del contacto es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('contactosPreferent')
        .notEmpty()
        .withMessage('La preferencia es requerida')
        .isIn(['FAVORITO', 'NORMAL', 'IMPORTANTE'])
        .withMessage('El tipo de preferencia del contacto es requerido'),

    body('contactostelefon')
        .notEmpty()
        .withMessage('El tipo de contacto es requerido')
        .isFloat({ min: 0 })
        .withMessage('El telefono no puede ser mayor o igual a 0'),

    checkValidators,
];
 
export const validateUpdateContactodRequest = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),

    body('contactosName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('contactosPreferent')
        .optional()
        .isIn(['FAVORITO', 'NORMAL', 'IMPORTANTE'])
        .withMessage('El tipo de preferencia del contacto es requerido'),

    body('contactostelefon')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El telefono no puede ser mayor o igual a 0'),
        
    checkValidators,
];
 
// Validaciones para activar/desactivar campos
export const validateContactoStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
 
// Validación para obtener campo por ID
export const validateGetContactodById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];