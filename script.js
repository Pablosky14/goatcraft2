document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('animate-on-load');
    }
});

const serverIpElement = document.getElementById('serverIp'); 

if (serverIpElement) {
    serverIpElement.addEventListener('click', function() {
        const ip = this.textContent.trim();
        navigator.clipboard.writeText(ip).then(() => {
            const message = document.getElementById('copyMessage');
            if (message) {
                message.classList.add('show');
                setTimeout(() => {
                    message.classList.remove('show');
                }, 1500);
            }
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
            alert('No se pudo copiar la IP automáticamente. Por favor, cópiala manualmente: ' + ip);
        });
    });
}

const mobileMenu = document.getElementById('mobile-menu');
const navLinksMenu = document.getElementById('nav-links-menu');

if (mobileMenu && navLinksMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinksMenu.classList.toggle('active');
    });

    navLinksMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinksMenu.classList.remove('active');
        });
    });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
const galleryImages = document.querySelectorAll('.image-gallery img');

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        lightboxImg.src = image.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxCloseBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
