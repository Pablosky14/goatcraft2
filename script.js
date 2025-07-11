// --- Page Load Animation Trigger ---
document.addEventListener('DOMContentLoaded', () => {
    // Select the main container
    const container = document.querySelector('.container');
    if (container) {
        // This adds the 'animate-on-load' class to the container
        // when the DOM is ready, triggering the CSS animation for the container.
        container.classList.add('animate-on-load');
    }
    // The h1 animation is directly defined in CSS and plays automatically
    // when the element becomes visible (with the container or when page loads).
});


// --- JavaScript for Copy IP Address ---
document.getElementById('serverIp').addEventListener('click', function() {
    const ip = this.textContent.trim(); // Get the IP text
    navigator.clipboard.writeText(ip).then(() => {
        // On successful copy, show the message
        const message = document.getElementById('copyMessage');
        message.classList.add('show');
        // Hide the message after 1.5 seconds
        setTimeout(() => {
            message.classList.remove('show');
        }, 1500);
    }).catch(err => {
        // Log any errors during copy
        console.error('Error al copiar el texto: ', err);
        // Optionally, alert the user if copy failed
        alert('No se pudo copiar la IP automáticamente. Por favor, cópiala manualmente: ' + ip);
    });
});


// --- JavaScript for Mobile Menu Toggle ---
const mobileMenu = document.getElementById('mobile-menu'); // The hamburger icon
const navLinksMenu = document.getElementById('nav-links-menu'); // The navigation links list

// Add click event listener to the hamburger icon
mobileMenu.addEventListener('click', () => {
    // Toggle the 'active' class on both the hamburger icon and the nav links
    // This will trigger the CSS transitions for opening/closing the menu
    mobileMenu.classList.toggle('active');
    navLinksMenu.classList.toggle('active');
});

// Close mobile menu when a navigation link is clicked
// This is especially useful for single-page sites, but good practice for multi-page too.
navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        // Remove the 'active' class from both elements, closing the menu
        mobileMenu.classList.remove('active');
        navLinksMenu.classList.remove('active');
    });
});