import { check, validationResult } from 'express-validator'

//Validaciones para el conductor 
const validacionesConductor = [
     // Verificar que se encuentren los campos obligatorios y no estén vacíos
    check(["nombre","apellido","telefono","cedula","placaAutomovil","rutaAsignada", "sectoresRuta", "institucion", "fotografiaDelConductor", 
        "email"
    ])
    .exists()
        .withMessage('Los campos "nombre","apellido","telefono","cedula","placaAutomovil","rutaAsignada", "sectoresRuta", "institucion", "fotografiaDelConductor" y/o "email"  son obligatorios')
    .notEmpty()
        .withMessage('Los campos "nombre","apellido","telefonor","cedula","placaAutomovil","rutaAsignada", "sectoresRuta", "institucion", "fotografiaDelConductor" y/o "email" no pueden estar vacíos')
    .customSanitizer(value => value?.trim()),

    //Verificación de que todo sea un string
    check(["nombre","apellido"])
    .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' })
        .withMessage('El campo debe ser un texto, no se acepta otro tipo de dato')
    .customSanitizer(value => value?.trim()),

    // Verificar que el numero de telefono sea de 10 digitos
    check("telefono")
    .isLength({ min: 10, max: 10 })
        .withMessage('El teléfono debe ser de 10 digitos')
    .isNumeric()
        .withMessage('El campo "teléfono" debe contener solo números')
    .customSanitizer(value => value?.trim()),

    // Verificar que el número de cédula tenga 10 dígitos
    check("cedula")
    .isLength({ min: 10, max: 10 })
        .withMessage('La cedula debe ser de 10 digitos')
    .isNumeric()
        .withMessage('El campo "teléfono" debe contener solo números')
    .customSanitizer(value => value?.trim()), 
    
    // Verificar que el número de placa tenga 7 dígitos
    check("placaAutomovil")
    .isLength({ min: 7, max: 7 })
        .withMessage('La placa debe ser de 7 digitos')
    .customSanitizer(value => value?.trim()),

    // Verificar que la ruta sea un número y que solo existan 12 rutaa
    check("rutaAsignada")
    .isNumeric()
        .withMessage('La ruta debe ser un número, no se acepta otro tipo de dato')
    .isInt({ min: 1, max: 12 })
        .withMessage('Solo existen 12 rutas disponibles en la Unidad Educativa Particular Emaús')
    .customSanitizer(value => value?.trim()),

    // Verificar que el email se enceuntre bien escrito
    check("email")
    .isEmail()
        .withMessage('El email debe ser un correo válido')
    .customSanitizer(value => value?.trim()),

    //Verificar la institución
    check("institucion")
    .equals("Unidad Educativa Particular Emaús")
        .withMessage('La institución debe ser la Unidad Educativa Particular Emaús')
    .isString()
        .withMessage('La institución debe ser un texto, no se acepta otro tipo de dato')
        .customSanitizer(value => value?.trim()),
    
    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
     }
]

export {validacionesConductor}