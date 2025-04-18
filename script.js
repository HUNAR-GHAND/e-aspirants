let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slide-dots');
let isTransitioning = false;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlides() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
            dots[index].classList.add('active');
        } else {
            slide.classList.remove('active');
            dots[index].classList.remove('active');
        }
    });
}

function changeSlide(direction) {
    if (isTransitioning) return;

    isTransitioning = true;
    const nextSlide = (currentSlide + direction + slides.length) % slides.length;

    // Add transition class to current slide
    slides[currentSlide].style.transform = `scale(0.95)`;
    slides[currentSlide].style.opacity = '0';

    // Update current slide
    currentSlide = nextSlide;

    // Reset and show new slide
    setTimeout(() => {
        slides[currentSlide].style.transform = 'scale(1)';
        slides[currentSlide].style.opacity = '1';
        updateSlides();
        isTransitioning = false;
    }, 300);
}

function goToSlide(index) {
    if (isTransitioning || index === currentSlide) return;

    isTransitioning = true;
    const direction = index > currentSlide ? 1 : -1;

    // Add transition class to current slide
    slides[currentSlide].style.transform = `scale(0.95)`;
    slides[currentSlide].style.opacity = '0';

    // Update current slide
    currentSlide = index;

    // Reset and show new slide
    setTimeout(() => {
        slides[currentSlide].style.transform = 'scale(1)';
        slides[currentSlide].style.opacity = '1';
        updateSlides();
        isTransitioning = false;
    }, 300);
}

// Auto slide every 2 seconds
let autoSlideInterval = setInterval(() => changeSlide(1), 2000);

// Pause auto-slide on hover
const slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

slideshowContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => changeSlide(1), 2000);
});