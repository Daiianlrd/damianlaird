function toggleMenu() {
    const lateralMenu = document.querySelector('.lateral-menu');
    lateralMenu.classList.toggle('active');
}

let slideIndex = 1; // Start with the first slide
showSlides(document, slideIndex);

// Contrôle des boutons précédent et suivant
function plusSlides(n) {
    showSlides(document, slideIndex += n);
}

// Contrôle des points indicateurs
function currentSlide(n) {
    showSlides(document, slideIndex = n);
}

function showSlides(container, n) {
    const slides = container.getElementsByClassName("slide");
    const dots = container.getElementsByClassName("dot");

    // Wrap around if the index exceeds the number of slides
    if (n > slides.length) {
        container.slideIndex = 1; // Go back to the first slide
    }
    if (n < 1) {
        container.slideIndex = slides.length; // Go to the last slide
    }

    // Hide all slides and deactivate all dots
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide only if it has content
    if (slides[container.slideIndex - 1] && slides[container.slideIndex - 1].children.length > 0) {
        slides[container.slideIndex - 1].style.display = "block";
        if (dots.length > 0) {
            dots[container.slideIndex - 1].className += " active";
        }
    }
}

function initializeSlider(container, startIndex = 1) {
    container.slideIndex = startIndex; // Store the slide index as a property of the container

    // Add event listeners for navigation buttons
    const prevButton = container.querySelector(".prev");
    const nextButton = container.querySelector(".next");

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            showSlides(container, --container.slideIndex);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showSlides(container, ++container.slideIndex);
        });
    }

    // Initialize the slider
    showSlides(container, container.slideIndex);
}

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
    currentSlide(slideNumber);

    // Défile vers le conteneur du slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function startSliderAt(slideNumber) {
    slideIndex = slideNumber;
    showSlides(document, slideIndex);
}

// Appeler cette fonction pour démarrer sur la slide 2
startSliderAt(2);

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

document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slideshow-container");

    sliders.forEach((slider, index) => {
        initializeSlider(slider, 1); // Start each slider at the first slide
    });
});