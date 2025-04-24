// Navegación y efectos del menú
document.addEventListener('DOMContentLoaded', function() {
    // Agregar botón de menú móvil
    const menu = document.querySelector('.head__menu');
    const menuList = document.querySelector('.menu__lista');
    const nav = document.querySelector('nav') || menu; // Buscar el nav o usar menu como fallback
    
    // Crear el botón hamburguesa
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Menú de navegación');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Insertar el botón en la navegación, no en el menú
    nav.insertBefore(menuToggle, menuList);
    
    // Funcionalidad del menú móvil
    menuToggle.addEventListener('click', function() {
        menuList.classList.toggle('active');
        if (menuList.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu__lista__item a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            menuList.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Desplazamiento suave a la sección
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    const headerOffset = 80; // Altura del header fijo
                    
                    window.scrollTo({
                        top: offsetTop - headerOffset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector('.head');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Marcar el enlace activo según la sección visible
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        menuLinks.forEach(link => {
            link.classList.remove('active', 'scroll-active');
            const href = link.getAttribute('href');
            
            if (href === '#' + current) {
                link.classList.add('active', 'scroll-active');
            }
        });
    });
    
    // Inicializar el estado del menú al cargar la página
    const scrollSpyCheck = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelector(`.menu__lista__item a[href="#${sectionId}"]`)?.classList.add('active', 'scroll-active');
            }
        });
    };
    
    // Ejecutar al cargar la página
    setTimeout(scrollSpyCheck, 100);
});