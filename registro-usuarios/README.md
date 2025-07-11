# Sistema de Registro de Usuarios

## Descripción

Este es un proyecto de registro de usuarios desarrollado como parte de la Tarea 3 de Programación Avanzada. La aplicación permite el registro de usuarios con validaciones tanto en el frontend como en el backend, implementando técnicas avanzadas de validación y persistencia de datos.

## Desarrollado por:

**Carlos Calapucha**

## Características

- ✅ Validación en tiempo real del lado del cliente
- ✅ Validación robusta del lado del servidor
- ✅ Interfaz de usuario moderna y responsiva
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Validación de formato de email
- ✅ Verificación de fortaleza de contraseña
- ✅ Prevención de registros duplicados
- ✅ Manejo de errores completo
- ✅ Base de datos MySQL

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

1. **Clonar el repositorio:**

```bash
git clone <url-del-repositorio>
cd registro-usuarios
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3000
DB_HOST=localhost
DB_USER=carlosc
DB_PASSWORD=car73h
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

Luego abrir el navegador en `http://localhost:3000`

## Estructura del Proyecto

```
registro-usuarios/
│
├── public/
│   ├── index.html        # Formulario HTML
│   ├── script.js         # Validaciones JavaScript
│   └── styles.css        # Estilos CSS
│
├── server.js             # Servidor principal
├── package.json          # Configuración del proyecto
├── .env                  # Variables de entorno
└── README.md             # Documentación
```

## Uso de la Aplicación

1. Abrir el navegador y ir a `http://localhost:3000`
2. Llenar el formulario con los datos requeridos
3. Las validaciones se ejecutan en tiempo real
4. Al enviar, se valida nuevamente en el servidor
5. Si todo es correcto, el usuario se registra en la base de datos

## Validaciones Implementadas

### Validación Frontend (JavaScript)

- **Validación en tiempo real de campos**
- **Nombre de usuario**: 3-50 caracteres, solo letras, números y guiones bajos
- **Email**: Formato válido de correo electrónico
- **Contraseña**: Mínimo 8 caracteres, debe contener mayúscula, minúscula y número
- **Confirmación**: Debe coincidir con la contraseña
- **Edad**: Número entre 18 y 99 años
- **Descripción**: Máximo 500 caracteres
- **Categoría**: Debe seleccionar una opción válida
- **Requisitos de contraseña visual**
- **Verificación de campos únicos**

### Validación Backend (Express-Validator)

- **Validación del lado del servidor**
- **Encriptación de contraseñas con bcrypt**
- **Verificación de usuarios existentes**
- **Sanitización de datos de entrada**
- **Manejo de errores del servidor**
- **Validación completa de todos los campos**
- **Verificación de unicidad en base de datos**

## Solución de Problemas

### Errores Comunes

- **Asegúrate de que MySQL está corriendo**
- **Verifica las credenciales en el archivo `.env`**
- **Comprueba que todas las dependencias están instaladas**

### Conexión a Base de Datos

Si encuentras problemas de conexión:

1. Verifica que MySQL está corriendo
2. Confirma que las credenciales son correctas (`carlosc` / `car73h`)
3. Asegúrate de que la base de datos `registro_usuarios` existe

### Puerto en uso

- Cambiar el puerto en el archivo `.env`
- Verificar que no haya otro proceso usando el puerto 3000

### Errores de validación

- Verificar que todos los campos cumplan los requisitos
- Revisar la consola del navegador para errores JavaScript
- Consultar los logs del servidor

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de datos**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Validación**: Express-validator, validaciones personalizadas JavaScript
- **Seguridad**: bcryptjs para encriptación de contraseñas
- **Otros**: CORS, dotenv

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start

# Ver usuarios registrados
curl http://localhost:3000/usuarios
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o realiza un pull request.

## Licencia

ISC License

## Autor

**Carlos Calapucha**

---

**Nota:** Este proyecto fue desarrollado como parte de la Tarea 3 de Programación Avanzada (PA_2P_202550). La aplicación demuestra la implementación de validaciones completas tanto en frontend como backend, con persistencia de datos en MySQL y manejo robusto de errores.

## Objetivos Cumplidos

✅ **Parte 1**: Configuración del proyecto con backend Node.js/Express y frontend HTML/CSS/JavaScript
✅ **Parte 2**: Validación completa del lado del cliente con JavaScript
✅ **Parte 3**: Validación del lado del servidor y persistencia en MySQL
✅ **Entregables**: Repositorio con código fuente y documentación completa
