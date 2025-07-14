document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('animate-on-load');
    }
    console.log('DOM Content Loaded.'); // Debugging log

    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxText = document.getElementById('lightbox-text'); 
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxPrevBtn = document.getElementById('lightbox-prev-btn'); 
    const lightboxNextBtn = document.getElementById('lightbox-next-btn'); 
    const lightboxContent = document.querySelector('.lightbox-content'); 

    // Mobile menu elements
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksMenu = document.getElementById('nav-links-menu');

    // Debugging: Check if mobile menu elements are found
    console.log('Mobile menu toggle element:', mobileMenu);
    console.log('Navigation links menu element:', navLinksMenu);

    // Mobile menu logic
    if (mobileMenu && navLinksMenu) {
        mobileMenu.addEventListener('click', () => {
            console.log('Mobile menu clicked!'); // Debugging log
            mobileMenu.classList.toggle('active');
            navLinksMenu.classList.toggle('active');
        });

        navLinksMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked, closing menu.'); // Debugging log
                mobileMenu.classList.remove('active');
                navLinksMenu.classList.remove('active');
            });
        });
    }

    // Server IP copy logic - ENSURING IT'S ONLY HERE
    const serverIpElement = document.getElementById('serverIp'); 
    if (serverIpElement) {
        serverIpElement.addEventListener('click', function() {
            const ip = this.textContent.trim();
            const tempInput = document.createElement('textarea');
            tempInput.value = ip;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy');
                const message = document.getElementById('copyMessage');
                if (message) {
                    message.classList.add('show');
                    setTimeout(() => {
                        message.classList.remove('show');
                    }, 1500);
                }
            } catch (err) {
                console.error('Error al copiar el texto: ', err);
                const customAlert = document.createElement('div');
                customAlert.classList.add('custom-alert');
                customAlert.innerHTML = `
                    <div class="custom-alert-content">
                        <p>No se pudo copiar la IP automáticamente. Por favor, cópiala manualmente:</p>
                        <p><strong>${ip}</strong></p>
                        <button class="custom-alert-button">Cerrar</button>
                    </div>
                `;
                document.body.appendChild(customAlert);
                customAlert.querySelector('.custom-alert-button').addEventListener('click', () => {
                    document.body.removeChild(customAlert);
                });
            } finally {
                document.body.removeChild(tempInput);
            }
        });
    }


    let currentImagesArray = []; 
    let currentImageIndex = 0; 

    // Function to update lightbox content
    function updateLightboxContent() {
        if (currentImagesArray.length > 0) {
            const currentImage = currentImagesArray[currentImageIndex];
            lightboxImg.src = currentImage.src;
            lightboxText.textContent = currentImage.description;
            // Show/hide navigation buttons based on current index
            lightboxPrevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
            lightboxNextBtn.style.display = currentImageIndex < currentImagesArray.length - 1 ? 'block' : 'none';
        }
    }

    // Function to open lightbox
    function openLightbox(imagesData, initialIndex = 0) {
        currentImagesArray = imagesData;
        currentImageIndex = initialIndex;
        updateLightboxContent(); 
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Lightbox opened with images:', currentImagesArray); 
    }

    // Attach event listeners for media gallery images
    const galleryImages = document.querySelectorAll('.image-gallery img');
    console.log('Found media gallery images:', galleryImages.length); // Debugging log
    galleryImages.forEach(image => {
        image.addEventListener('click', (event) => { 
            console.log('Media gallery image clicked. Event target:', event.target); 
            console.log('Original src:', image.src, 'Alt:', image.alt); 
            const imgSrc = image.src.includes('placehold.co') ? image.src : image.getAttribute('src');
            openLightbox([{ src: imgSrc, description: image.alt }]); 
        });
    });

    // Attach event listeners for community buildings
    const buildingItems = document.querySelectorAll('.community-buildings-gallery .building-item');
    console.log('Found community building items:', buildingItems.length); // Debugging log
    buildingItems.forEach(item => {
        item.addEventListener('click', (event) => { 
            console.log('Community building item clicked.'); 
            try {
                const imagesData = JSON.parse(item.dataset.images);
                openLightbox(imagesData);
            } catch (e) {
                console.error('Error parsing data-images JSON:', e);
                // Fallback if JSON is malformed or data-images is missing
                openLightbox([{ src: item.querySelector('img').src, description: item.querySelector('p').textContent }]);
            }
        });
    });

    // Navigation button event listeners
    lightboxPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxContent();
        }
    });

    lightboxNextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentImageIndex < currentImagesArray.length - 1) {
            currentImageIndex++;
            updateLightboxContent();
        }
    });

    lightboxCloseBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Prevent clicks on the lightbox content from closing the lightbox
    lightboxContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Close lightbox when clicking on the overlay itself
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) { 
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                lightboxPrevBtn.click(); 
            } else if (e.key === 'ArrowRight') {
                lightboxNextBtn.click(); 
            }
        }
    });
}); // End of DOMContentLoaded
