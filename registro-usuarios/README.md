# Sistema de Registro de Usuarios

## Descripción
Este es un proyecto de registro de usuarios desarrollado como parte de la Tarea 3 de Programación Avanzada. La aplicación permite el registro de usuarios con validaciones tanto en el frontend como en el backend.

## Requisitos Previos
- Node.js (v14 o superior)
- MySQL
- npm (Node Package Manager)

## Configuración Inicial

### Base de Datos
1. Instalar MySQL
2. Crear la base de datos:
```sql
CREATE DATABASE registro_usuarios;
USE registro_usuarios;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    edad INT NOT NULL,
    descripcion TEXT,
    categoria ENUM('estudiante', 'profesional', 'empresario') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Configuración del Proyecto

1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd registro-usuarios
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=registro_usuarios
```

## Ejecución del Proyecto

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

## Características

### Validación Frontend
- Validación en tiempo real de campos
- Requisitos de contraseña
- Validación de formato de correo
- Verificación de campos únicos

### Validación Backend
- Validación de datos del servidor
- Encriptación de contraseñas
- Verificación de usuarios existentes
- Manejo de errores

## Estructura del Proyecto
```
registro-usuarios/
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
│
├── server.js
├── package.json
└── .env
```

## Solución de Problemas

### Errores Comunes
- Asegúrate de que MySQL está corriendo
- Verifica las credenciales en el archivo `.env`
- Comprueba que todas las dependencias están instaladas

### Conexión a Base de Datos
Si encuentras problemas de conexión:
1. Verifica que MySQL está corriendo
2. Confirma que las credenciales son correctas
3. Asegúrate de que la base de datos `registro_usuarios` existe

## Tecnologías Utilizadas
- Node.js
- Express.js
- MySQL
- bcryptjs
- dotenv
- express-validator

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o realiza un pull request.

## Licencia
[Especificar la licencia, por ejemplo MIT]

---

**Nota:** Este proyecto fue desarrollado como parte de un ejercicio académico de Programación Avanzada. 