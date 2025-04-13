// Toggle the menu visibility
function toggleMenu() {
    const menu = document.querySelector("nav.menu ul");
    menu.classList.toggle("active");
}

// Add event listener to the hamburger icon
document.querySelector(".hamburger").addEventListener("click", toggleMenu);

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
    initSlides("slider-mde-1"); // Add your new slideshow here
    initSlides("slider-mde-2"); // Add your new slideshow here
    initSlides("slider-mde-3"); // Add your new slideshow here
    initSlides("slider-mde-4"); // Add your new slideshow here
});

// Store the current lightbox index and images
let lightboxIndex = 0;
let lightboxImages = [];

// Open the lightbox and initialize the images
function openLightbox(img, slideshowId) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    // Get all images from the specified slideshow
    lightboxImages = Array.from(document.querySelectorAll(`#${slideshowId} .slide img`));
    lightboxIndex = lightboxImages.findIndex((image) => image.src === img.src);

    // Display the lightbox
    lightbox.style.display = "flex"; // Use flex to center the content
    lightboxImg.src = lightboxImages[lightboxIndex].src;
}

// Close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

// Navigate through lightbox images
function changeLightboxSlide(n) {
    lightboxIndex += n;

    // Wrap around if the index goes out of bounds
    if (lightboxIndex >= lightboxImages.length) {
        lightboxIndex = 0;
    }
    if (lightboxIndex < 0) {
        lightboxIndex = lightboxImages.length - 1;
    }

    // Update the lightbox image
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = lightboxImages[lightboxIndex].src;
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