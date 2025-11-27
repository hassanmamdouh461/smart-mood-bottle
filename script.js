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
    updateProgressBar();
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Update progress bar based on current slide
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = (currentSlide / totalSlides) * 100;
    progressBar.style.width = progress + '%';
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