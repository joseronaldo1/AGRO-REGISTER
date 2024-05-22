import { check } from "express-validator";

// Validaciones para registrar usuarios
export const validarUsuario = [
    check('nombre', 'El nombre es obligatorio y debe contener solo letras, máximo 50 caracteres')
        .notEmpty()
        .isLength({ max: 50 })
        .matches(/^[A-Za-z\s]+$/),

    check('apellido', 'El apellido es obligatorio y debe contener solo letras, máximo 50 caracteres')
        .notEmpty()
        .isLength({ max: 50 })
        .matches(/^[A-Za-z\s]+$/),

    check('rol', 'Rol no existe')
        .notEmpty()
        .isIn(["administrador", "empleado"]),
];

// Validaciones para actualizar usuarios (campos opcionales)
export const validarUsu = [
    check('nombre', 'El nombre es obligatorio y debe contener solo letras, máximo 50 caracteres')
        .optional()
        .notEmpty()
        .isLength({ max: 50 })
        .matches(/^[A-Za-z\s]+$/),

    check('apellido', 'El apellido es obligatorio y debe contener solo letras, máximo 50 caracteres')
        .optional()
        .notEmpty()
        .isLength({ max: 50 })
        .matches(/^[A-Za-z\s]+$/),

    check('rol', 'Rol no existe')
        .optional()
        .notEmpty()
        .isIn(["administrador", "empleado"]),
];
