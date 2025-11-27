let currentSlide = 1;
const totalSlides = 8;

function showSlide(n) {
    // Remove active class from all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });

    // Handle circular navigation
    if (n > totalSlides) currentSlide = 1;
    if (n < 1) currentSlide = totalSlides;

    // Add active class to current slide
    const slideId = `slide-${currentSlide}`;
    document.getElementById(slideId).classList.add('active');

    // Update progress bar
    const progressBar = document.getElementById('progress-bar-fill');
    const progress = (currentSlide / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Initialize
showSlide(currentSlide);