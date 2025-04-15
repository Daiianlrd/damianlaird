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
    initSlides("slider-interpretariat"); // Add your new slideshow here
        // Add new slideshows for Digitalisation de la formation
        initSlides("slider-digitalisation-1");
        initSlides("slider-digitalisation-2");
        initSlides("slider-digitalisation-3");
        initSlides("slider-digitalisation-4");
        initSlides("slider-programme");

    const toggleBtn = document.getElementById("toggle-more");
    const moreText = document.getElementById("more-text");

    if (toggleBtn && moreText) {
        toggleBtn.addEventListener("click", () => {
            const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
            toggleBtn.setAttribute("aria-expanded", !expanded);
            moreText.style.display = expanded ? "none" : "block";
            toggleBtn.textContent = expanded ? "Lire plus" : "Réduire";
        });
    }

    addSwipeListeners("slider-site-web");
    addSwipeListeners("slider-intranet");
    addSwipeListeners("slider-digitalisation");
    addSwipeListeners("slider-mde-1");
    addSwipeListeners("slider-mde-2");
    addSwipeListeners("slider-mde-3");
    addSwipeListeners("slider-mde-4");
    addSwipeListeners("slider-interpretariat");
    addSwipeListeners("slider-digitalisation-1");
    addSwipeListeners("slider-digitalisation-2");
    addSwipeListeners("slider-digitalisation-3");
    addSwipeListeners("slider-digitalisation-4");
    addSwipeListeners("slider-programme");
});

// Store the current lightbox index and images
let lightboxIndex = 0;
let lightboxImages = [];

// Variables to track touch positions for lightbox
let lightboxTouchStartX = 0;
let lightboxTouchEndX = 0;

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

    // Add swipe listeners for the lightbox
    addLightboxSwipeListeners();
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

// Function to handle touch start in lightbox
function handleLightboxTouchStart(event) {
    lightboxTouchStartX = event.touches[0].clientX;
}

// Function to handle touch move in lightbox
function handleLightboxTouchMove(event) {
    lightboxTouchEndX = event.touches[0].clientX;
}

// Function to handle touch end and determine swipe direction in lightbox
function handleLightboxTouchEnd() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    if (lightboxTouchEndX - lightboxTouchStartX > swipeThreshold) {
        // Swipe right
        changeLightboxSlide(-1);
    } else if (lightboxTouchStartX - lightboxTouchEndX > swipeThreshold) {
        // Swipe left
        changeLightboxSlide(1);
    }
}

// Add swipe event listeners to the lightbox
function addLightboxSwipeListeners() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.addEventListener("touchstart", handleLightboxTouchStart);
        lightbox.addEventListener("touchmove", handleLightboxTouchMove);
        lightbox.addEventListener("touchend", handleLightboxTouchEnd);
    }
}

// Close lightbox when clicking outside the image
document.addEventListener("click", (event) => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (lightbox.style.display === "flex" && !lightboxImg.contains(event.target)) {
        closeLightbox();
    }
});

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
const skillCards = document.querySelectorAll('.skill');

skillCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    skillCards.forEach(c => c.classList.remove('expanded'));
    card.classList.add('expanded');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('expanded');
  });
});

// Variables to track touch positions
let touchStartX = 0;
let touchEndX = 0;

// Function to handle touch start
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

// Function to handle touch move
function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

// Function to handle touch end and determine swipe direction
function handleTouchEnd(slideshowId) {
    const swipeThreshold = 50; // Minimum distance for a swipe
    if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right
        plusSlides(-1, slideshowId);
    } else if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left
        plusSlides(1, slideshowId);
    }
}

// Add touch event listeners to each slideshow
function addSwipeListeners(slideshowId) {
    const slideshowContainer = document.getElementById(slideshowId);
    if (slideshowContainer) {
        slideshowContainer.addEventListener("touchstart", handleTouchStart);
        slideshowContainer.addEventListener("touchmove", handleTouchMove);
        slideshowContainer.addEventListener("touchend", () => handleTouchEnd(slideshowId));
    }
}