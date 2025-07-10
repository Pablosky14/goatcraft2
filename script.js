document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const copyIpButtons = document.querySelectorAll('.copy-ip');

    // Función para mostrar una sección y ocultar las demás con transición
    const showSection = (targetId) => {
        pageSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Event listener para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace
            const targetId = e.target.dataset.target;
            showSection(targetId);
            // Opcional: Desplazarse suavemente a la parte superior de la sección
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Event listener para copiar la IP
    copyIpButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const ip = button.dataset.ip;
            try {
                await navigator.clipboard.writeText(ip);
                button.textContent = '¡Copiado!';
                setTimeout(() => {
                    button.textContent = 'Copiar IP';
                }, 2000); // Vuelve al texto original después de 2 segundos
            } catch (err) {
                console.error('Error al copiar el texto: ', err);
                alert('No se pudo copiar la IP. Por favor, cópiala manualmente: ' + ip);
            }
        });
    });

    // Mostrar la sección "Inicio" por defecto al cargar la página
    showSection('home');
});