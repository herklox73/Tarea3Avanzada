class FormValidator {
    constructor() {
        this.form = document.getElementById('registroForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.resultado = document.getElementById('resultado');
        
        this.initEventListeners();
        this.initPasswordValidation();
        this.initCharacterCounter();
    }

    initEventListeners() {
        // Validación en tiempo real
        this.form.addEventListener('input', (e) => {
            this.validateField(e.target);
        });

        // Validación al enviar
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Validación de confirmación de contraseña
        document.getElementById('confirmar_contraseña').addEventListener('input', () => {
            this.validatePasswordMatch();
        });
    }

    initPasswordValidation() {
        const passwordInput = document.getElementById('contraseña');
        passwordInput.addEventListener('input', () => {
            this.validatePasswordStrength(passwordInput.value);
        });
    }

    initCharacterCounter() {
        const descripcionInput = document.getElementById('descripcion');
        const charCount = document.getElementById('char-count');
        
        descripcionInput.addEventListener('input', () => {
            const count = descripcionInput.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                charCount.style.color = '#dc3545';
            } else {
                charCount.style.color = '#666';
            }
        });
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        
        switch (fieldName) {
            case 'nombre_usuario':
                this.validateUsername(value);
                break;
            case 'email':
                this.validateEmail(value);
                break;
            case 'contraseña':
                this.validatePassword(value);
                break;
            case 'confirmar_contraseña':
                this.validatePasswordMatch();
                break;
            case 'edad':
                this.validateAge(value);
                break;
            case 'descripcion':
                this.validateDescription(value);
                break;
            case 'categoria':
                this.validateCategory(value);
                break;
        }
    }

    validateUsername(username) {
        const errors = [];
        
        if (!username) {
            errors.push('El nombre de usuario es obligatorio');
        } else if (username.length < 3) {
            errors.push('El nombre de usuario debe tener al menos 3 caracteres');
        } else if (username.length > 50) {
            errors.push('El nombre de usuario no puede exceder 50 caracteres');
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            errors.push('El nombre de usuario solo puede contener letras, números y guiones bajos');
        }
        
        this.showFieldError('nombre_usuario', errors);
        return errors.length === 0;
    }

    validateEmail(email) {
        const errors = [];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            errors.push('El correo electrónico es obligatorio');
        } else if (!emailPattern.test(email)) {
            errors.push('El formato del correo electrónico no es válido');
        }
        
        this.showFieldError('email', errors);
        return errors.length === 0;
    }

    validatePassword(password) {
        const errors = [];
        
        if (!password) {
            errors.push('La contraseña es obligatoria');
        } else if (password.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres');
        } else if (!/(?=.*[a-z])/.test(password)) {
            errors.push('La contraseña debe contener al menos una letra minúscula');
        } else if (!/(?=.*[A-Z])/.test(password)) {
            errors.push('La contraseña debe contener al menos una letra mayúscula');
        } else if (!/(?=.*\d)/.test(password)) {
            errors.push('La contraseña debe contener al menos un número');
        }
        
        this.showFieldError('contraseña', errors);
        return errors.length === 0;
    }

    validatePasswordStrength(password) {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password)
        };

        document.getElementById('length-check').className = checks.length ? 'valid' : '';
        document.getElementById('uppercase-check').className = checks.uppercase ? 'valid' : '';
        document.getElementById('lowercase-check').className = checks.lowercase ? 'valid' : '';
        document.getElementById('number-check').className = checks.number ? 'valid' : '';
    }

    validatePasswordMatch() {
        const password = document.getElementById('contraseña').value;
        const confirmPassword = document.getElementById('confirmar_contraseña').value;
        const errors = [];
        
        if (confirmPassword && password !== confirmPassword) {
            errors.push('Las contraseñas no coinciden');
        }
        
        this.showFieldError('confirmar_contraseña', errors);
        return errors.length === 0;
    }

    validateAge(age) {
        const errors = [];
        const ageNum = parseInt(age);
        
        if (!age) {
            errors.push('La edad es obligatoria');
        } else if (isNaN(ageNum)) {
            errors.push('La edad debe ser un número');
        } else if (ageNum < 18) {
            errors.push('Debes ser mayor de 18 años');
        } else if (ageNum > 99) {
            errors.push('La edad no puede ser mayor a 99 años');
        }
        
        this.showFieldError('edad', errors);
        return errors.length === 0;
    }

    validateDescription(description) {
        const errors = [];
        
        if (description.length > 500) {
            errors.push('La descripción no puede exceder 500 caracteres');
        }
        
        this.showFieldError('descripcion', errors);
        return errors.length === 0;
    }

    validateCategory(category) {
        const errors = [];
        const validCategories = ['estudiante', 'profesional', 'empresario'];
        
        if (!category) {
            errors.push('Debes seleccionar una categoría');
        } else if (!validCategories.includes(category)) {
            errors.push('Categoría no válida');
        }
        
        this.showFieldError('categoria', errors);
        return errors.length === 0;
    }

    showFieldError(fieldName, errors) {
        const errorElement = document.getElementById(`error-${fieldName}`);
        const inputElement = document.getElementById(fieldName);
        
        if (errors.length > 0) {
            errorElement.textContent = errors[0];
            errorElement.classList.add('show');
            inputElement.classList.add('error');
        } else {
            errorElement.classList.remove('show');
            inputElement.classList.remove('error');
        }
    }

    validateForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        let isValid = true;
        
        isValid = this.validateUsername(data.nombre_usuario) && isValid;
        isValid = this.validateEmail(data.email) && isValid;
        isValid = this.validatePassword(data.contraseña) && isValid;
        isValid = this.validatePasswordMatch() && isValid;
        isValid = this.validateAge(data.edad) && isValid;
        isValid = this.validateDescription(data.descripcion) && isValid;
        isValid = this.validateCategory(data.categoria) && isValid;
        
        return isValid;
    }

    async checkUserExists(field, value) {
        try {
            const response = await fetch('/verificar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: value })
            });
            const result = await response.json();
            return result.existe;
        } catch (error) {
            console.error('Error verificando usuario:', error);
            return false;
        }
    }

    async validateUniqueFields() {
        const username = document.getElementById('nombre_usuario').value;
        const email = document.getElementById('email').value;
        let isUnique = true;

        if (this.validateUsername(username)) {
            const usernameExists = await this.checkUserExists('nombre_usuario', username);
            if (usernameExists) {
                this.showFieldError('nombre_usuario', ['El nombre de usuario ya está en uso']);
                isUnique = false;
            }
        }

        if (this.validateEmail(email)) {
            const emailExists = await this.checkUserExists('email', email);
            if (emailExists) {
                this.showFieldError('email', ['El correo electrónico ya está registrado']);
                isUnique = false;
            }
        }

        return isUnique;
    }

    async handleSubmit() {
        if (!this.validateForm()) {
            this.showResult('Por favor corrige los errores antes de continuar', 'error');
            return;
        }

        // Check for unique fields before submission
        const uniqueFieldsValid = await this.validateUniqueFields();
        if (!uniqueFieldsValid) {
            return;
        }

        this.setLoading(true);
        
        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            const response = await fetch('/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                this.showResult('¡Registro exitoso! Bienvenido ' + data.nombre_usuario, 'success');
                this.form.reset();
                this.resetPasswordChecks();
            } else {
                // Handle server-side validation errors
                const errorMessages = result.errors 
                    ? result.errors.map(err => err.msg).join('\n') 
                    : (result.message || 'Error en el registro');
                this.showResult(errorMessages, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showResult('Error de conexión. Inténtalo de nuevo.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = '<span class="loading"></span>Registrando...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = 'Registrar Usuario';
        }
    }

    showResult(message, type) {
        this.resultado.className = `resultado ${type}`;
        this.resultado.textContent = message;
        this.resultado.scrollIntoView({ behavior: 'smooth' });
    }

    resetPasswordChecks() {
        document.getElementById('length-check').className = '';
        document.getElementById('uppercase-check').className = '';
        document.getElementById('lowercase-check').className = '';
        document.getElementById('number-check').className = '';
    }
}

// Inicializar la validación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
});