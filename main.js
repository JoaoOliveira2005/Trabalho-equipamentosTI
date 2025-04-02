document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gallery
    const galleryImages = [
        'https://images.pexels.com/photos/2248523/pexels-photo-2248523.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/7262877/pexels-photo-7262877.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/6621341/pexels-photo-6621341.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];

    const galleryWrapper = document.querySelector('.gallery-wrapper');
    let currentImageIndex = 0;
    let galleryInterval;

    // Load initial images
    function loadGalleryImages() {
        galleryWrapper.innerHTML = '';
        galleryImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Gallery Image ${index + 1}`;
            img.style.transform = `translateX(${(index - currentImageIndex) * 100}%)`;
            galleryWrapper.appendChild(img);
        });
    }

    function startGalleryAutoplay() {
        galleryInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateGallery();
        }, 10000); // Change image every 10 seconds
    }

    function stopGalleryAutoplay() {
        clearInterval(galleryInterval);
    }

    loadGalleryImages();
    startGalleryAutoplay();

    // Gallery Controls
    document.querySelector('.prev').addEventListener('click', () => {
        stopGalleryAutoplay();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGallery();
        startGalleryAutoplay();
    });

    document.querySelector('.next').addEventListener('click', () => {
        stopGalleryAutoplay();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateGallery();
        startGalleryAutoplay();
    });

    function updateGallery() {
        const images = galleryWrapper.querySelectorAll('img');
        images.forEach((img, index) => {
            img.style.transform = `translateX(${(index - currentImageIndex) * 100}%)`;
        });
    }

    // About Section Image Rotation
    function checkAboutRotation() {
        const aboutSection = document.querySelector('.about');
        const aboutImage = document.querySelector('.about-image');
        const rect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25) {
            aboutImage.classList.add('rotate');
        } else {
            aboutImage.classList.remove('rotate');
        }
    }

    // Initial check for about section
    checkAboutRotation();

    // Header visibility
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show/hide header based on scroll direction
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.remove('visible');
        } else {
            // Scrolling up
            header.classList.add('visible');
        }
        
        lastScrollTop = scrollTop;
        
        // Check about section rotation
        checkAboutRotation();
    });

    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso!');
        contactForm.reset();
    });
});