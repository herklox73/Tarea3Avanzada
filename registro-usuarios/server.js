const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

// Configuración de la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectar a la base de datos con mejor manejo de errores
db.connect((err) => {
    if (err) {
        console.error('Detalles completos del error de conexión:', err);
        console.error(`Detalles de conexión:
            Host: ${process.env.DB_HOST}
            Usuario: ${process.env.DB_USER}
            Base de datos: ${process.env.DB_NAME}
        `);
        return;
    }
    console.log('Conectado a MySQL correctamente');
});

// Validaciones del servidor
const validacionesRegistro = [
    body('nombre_usuario')
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
    
    body('email')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .normalizeEmail(),
    
    body('contraseña')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos una minúscula, una mayúscula y un número'),
    
    body('confirmar_contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.contraseña) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    
    body('edad')
        .isInt({ min: 18, max: 99 })
        .withMessage('La edad debe ser un número entre 18 y 99'),
    
    body('descripcion')
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres'),
    
    body('categoria')
        .isIn(['estudiante', 'profesional', 'empresario'])
        .withMessage('Categoría no válida')
];

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para verificar si el usuario ya existe
app.post('/verificar-usuario', (req, res) => {
    const { nombre_usuario, email } = req.body;
    
    db.query(
        'SELECT id FROM usuarios WHERE nombre_usuario = ? OR email = ?',
        [nombre_usuario, email],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error del servidor' });
            }
            
            if (results.length > 0) {
                return res.json({ existe: true });
            }
            
            res.json({ existe: false });
        }
    );
});

// Ruta para registrar usuario
app.post('/registro', validacionesRegistro, async (req, res) => {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const { nombre_usuario, email, contraseña, edad, descripcion, categoria } = req.body;

    try {
        // Verificar si el usuario ya existe
        const checkUser = await new Promise((resolve, reject) => {
            db.query(
                'SELECT id FROM usuarios WHERE nombre_usuario = ? OR email = ?',
                [nombre_usuario, email],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });

        if (checkUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de usuario o email ya existe'
            });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar usuario en la base de datos
        db.query(
            'INSERT INTO usuarios (nombre_usuario, email, contraseña, edad, descripcion, categoria) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre_usuario, email, hashedPassword, edad, descripcion, categoria],
            (err, results) => {
                if (err) {
                    console.error('Error al insertar usuario:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error del servidor al registrar usuario'
                    });
                }

                res.json({
                    success: true,
                    message: 'Usuario registrado exitosamente',
                    userId: results.insertId
                });
            }
        );

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({
            success: false,
            message: 'Error del servidor'
        });
    }
});

// Ruta para obtener todos los usuarios (para testing)
app.get('/usuarios', (req, res) => {
    db.query('SELECT id, nombre_usuario, email, edad, descripcion, categoria, created_at FROM usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error del servidor' });
        }
        res.json(results);
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});