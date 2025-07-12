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


// --- JavaScript for Copy IP Address (with safety check) ---
// Get the element first
const serverIpElement = document.getElementById('serverIp'); 

// ONLY add the event listener if the element actually exists on this page
if (serverIpElement) {
    serverIpElement.addEventListener('click', function() {
        const ip = this.textContent.trim(); // Get the IP text
        navigator.clipboard.writeText(ip).then(() => {
            // On successful copy, show the message
            const message = document.getElementById('copyMessage');
            if (message) { // Also check if copyMessage element exists
                message.classList.add('show');
                // Hide the message after 1.5 seconds
                setTimeout(() => {
                    message.classList.remove('show');
                }, 1500);
            }
        }).catch(err => {
            // Log any errors during copy
            console.error('Error al copiar el texto: ', err);
            // Optionally, alert the user if copy failed
            alert('No se pudo copiar la IP automáticamente. Por favor, cópiala manualmente: ' + ip);
        });
    });
}


// --- JavaScript for Mobile Menu Toggle ---
const mobileMenu = document.getElementById('mobile-menu'); // The hamburger icon
const navLinksMenu = document.getElementById('nav-links-menu'); // The navigation links list

// Add click event listener to the hamburger icon ONLY if both elements exist
if (mobileMenu && navLinksMenu) {
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
}

// --- Lightbox Functionality ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
const galleryImages = document.querySelectorAll('.image-gallery img');

// Add click listener to each image in the gallery
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        // Set the clicked image's source to the lightbox image
        lightboxImg.src = image.src;
        // Add 'active' class to show the lightbox
        lightbox.classList.add('active');
        // Prevent body scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
    });
});

// Add click listener to the close button
lightboxCloseBtn.addEventListener('click', () => {
    // Remove 'active' class to hide the lightbox
    lightbox.classList.remove('active');
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
});

// Optional: Close lightbox when clicking outside the image content
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) { // Check if the click was directly on the overlay
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Optional: Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});