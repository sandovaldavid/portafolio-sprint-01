// Mejorar el formulario de contacto con validación y animaciones
document.addEventListener('DOMContentLoaded', function() {
    const button_envio = document.getElementById("enviar");
    const inputs = document.querySelectorAll(".contacto__input");
    const form = document.querySelector(".contacto__form");
    
    // Añadir efecto de enfoque a los campos de entrada
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('input-focused');
            }
        });
    });
    
    // Validación básica del formulario
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
                        showError(input, 'Por favor ingrese un email válido');
                        isValid = false;
                    }
                }
            }
        });
        
        return isValid;
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
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
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('input-error');
    }
    
    // Envío de formulario
    button_envio.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const email = document.getElementById('email').value;
            const nombre = document.getElementById('nombre').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Mostrar mensaje de éxito antes de redirigir
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito!';
            form.appendChild(successMsg);
            
            // Animación de éxito
            button_envio.innerHTML = '<i class="fas fa-check"></i> Enviado';
            button_envio.classList.add('success');
            
            // Redirigir después de un breve retraso
            setTimeout(() => {
                window.location.href = `mailto:sandovaldavid2201@gmail.com?subject=${asunto}&body=Nombre%3A${nombre}%0ACorreo%3A${email}%0AMensaje%3A${mensaje}`;
            }, 1500);
        }
    });
});