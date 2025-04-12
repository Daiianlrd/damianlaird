function toggleMenu() {
    const lateralMenu = document.querySelector('.lateral-menu');
    lateralMenu.classList.toggle('active');
}

// Store the current slide index for each slideshow
const slideIndices = {};

// Initialize slide indices for each slideshow
function initSlides(slideshowId) {
    slideIndices[slideshowId] = 0;
    showSlides(slideIndices[slideshowId], slideshowId);
}

// Function to navigate slides
function plusSlides(n, slideshowId) {
    slideIndices[slideshowId] += n;
    showSlides(slideIndices[slideshowId], slideshowId);
}

// Function to display the correct slide
function showSlides(n, slideshowId) {
    const slides = document.querySelectorAll(`#${slideshowId} .slide`);
    if (n >= slides.length) {
        slideIndices[slideshowId] = 0;
    }
    if (n < 0) {
        slideIndices[slideshowId] = slides.length - 1;
    }
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndices[slideshowId] ? "block" : "none";
    });
}

// Initialize all slideshows on page load
document.addEventListener("DOMContentLoaded", () => {
    initSlides("slider-site-web");
    initSlides("slider-intranet");
    initSlides("slider-digitalisation");
});

// Lightbox functionality
function openLightbox(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

function goToSlide(slideNumber) {
    // Navigue vers le slide correspondant
    plusSlides(slideNumber - slideIndices["slider-site-web"], "slider-site-web");

    // Défile vers le conteneur du slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Accordion functionality
const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}