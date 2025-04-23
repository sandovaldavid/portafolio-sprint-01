// Mejorar el formulario de contacto con validación y animaciones
document.addEventListener('DOMContentLoaded', function() {
    const button_envio = document.getElementById("enviar");
    const inputs = document.querySelectorAll(".contacto__input");
    const form = document.querySelector(".contacto__form");
    const formStatus = document.querySelector(".form-status");
    
    // Añadir efecto de enfoque a los campos de entrada
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.closest('.form-group').classList.remove('input-focused');
            }
        });
        
        // Verificar si el input ya tiene valor al cargar la página
        if (input.value !== '') {
            input.closest('.form-group').classList.add('input-focused');
        }
    });
    
    // Validación del formulario
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                showError(input, 'Este campo es obligatorio');
                isValid = false;
            } else {
                clearError(input);
                
                // Validación específica para email
                if (input.id === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        showError(input, 'Por favor ingresa un email válido');
                        isValid = false;
                    }
                }
            }
        });
        
        return isValid;
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            formGroup.appendChild(error);
        } else {
            errorElement.textContent = message;
        }
        
        input.classList.add('input-error');
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('input-error');
    }
    
    // Envío de formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const email = document.getElementById('email').value;
            const nombre = document.getElementById('nombre').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Cambiar el botón a estado de carga
            button_envio.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button_envio.disabled = true;
            
            // Simular retraso de envío (en una aplicación real, aquí iría una petición fetch/ajax)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito!';
                
                // Limpiar mensajes anteriores
                const oldSuccess = form.querySelector('.success-message');
                if (oldSuccess) {
                    form.removeChild(oldSuccess);
                }
                
                form.appendChild(successMsg);
                
                // Cambiar el botón a estado de éxito
                button_envio.innerHTML = '<i class="fas fa-check"></i> Enviado';
                button_envio.classList.add('success');
                
                // Redirigir después de un breve retraso
                setTimeout(() => {
                    window.location.href = `mailto:contact@devsandoval.me?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent('Nombre: ' + nombre + '\nCorreo: ' + email + '\n\nMensaje:\n' + mensaje)}`;
                    
                    // Resetear el formulario para futuros envíos
                    form.reset();
                    button_envio.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
                    button_envio.disabled = false;
                    button_envio.classList.remove('success');
                    
                    inputs.forEach(input => {
                        input.closest('.form-group').classList.remove('input-focused');
                    });
                }, 1500);
            }, 1000);
        }
    });
});