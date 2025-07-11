// JavaScript for Copy IP
document.getElementById('serverIp').addEventListener('click', function() {
    const ip = this.textContent.trim();
    navigator.clipboard.writeText(ip).then(() => {
        const message = document.getElementById('copyMessage');
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
        }, 1500); // Hide message after 1.5 seconds
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
});

// JavaScript for Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinksMenu = document.getElementById('nav-links-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinksMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked (for single-page navigation)
navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinksMenu.classList.remove('active');
    });
});