let currentSlide = 1;
const totalSlides = 8;
let isTransitioning = false;

// Anchor dot configurations for each slide
const anchorDots = [
    { id: 'anchor-1', slide: 1 },
    { id: 'anchor-2', slide: 2, icon: null },
    { id: 'anchor-3', slide: 3, icon: 'fa-triangle-exclamation' },
    { id: 'anchor-4', slide: 4 },
    { id: 'anchor-5', slide: 5, text: '1' },
    { id: 'anchor-6', slide: 6, icon: 'fa-bell' },
    { id: 'anchor-7', slide: 7 },
    { id: 'anchor-8', slide: 8 }
];

// Create all anchor dots dynamically
function createAnchorDots() {
    anchorDots.forEach(config => {
        const slide = document.getElementById(`slide-${config.slide}`);
        if (slide) {
            const dot = document.createElement('div');
            dot.className = 'anchor-dot';
            dot.id = config.id;

            // Add icon if specified
            if (config.icon) {
                const icon = document.createElement('i');
                icon.className = `fa-solid ${config.icon}`;
                dot.appendChild(icon);
            }

            // Add text if specified
            if (config.text) {
                dot.textContent = config.text;
            }

            slide.appendChild(dot);
        }
    });
}

// Create particle trail effect
function createParticleTrail(x, y) {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle-trail';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-green)';
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 800);
        }, i * 50);
    }
}

// Magic Move transition with FLIP technique
function magicMoveTransition(fromSlideNum, toSlideNum) {
    if (isTransitioning) return;
    isTransitioning = true;

    const fromSlide = document.getElementById(`slide-${fromSlideNum}`);
    const toSlide = document.getElementById(`slide-${toSlideNum}`);
    const overlay = document.getElementById('transition-overlay');

    const fromDot = document.getElementById(`anchor-${fromSlideNum}`);
    const toDot = document.getElementById(`anchor-${toSlideNum}`);

    // Start transition
    overlay.classList.add('active');
    fromSlide.classList.add('transitioning-out');

    // Animate current dot if exists
    if (fromDot) {
        const rect = fromDot.getBoundingClientRect();
        createParticleTrail(rect.left + rect.width / 2, rect.top + rect.height / 2);
        fromDot.classList.add('morphing');
    }

    // After 400ms, switch slides
    setTimeout(() => {
        fromSlide.classList.remove('active', 'transitioning-out');
        toSlide.classList.add('transitioning-in');

        setTimeout(() => {
            toSlide.classList.add('active');
            toSlide.classList.remove('transitioning-in');
            overlay.classList.remove('active');

            if (fromDot) fromDot.classList.remove('morphing');
            if (toDot) toDot.classList.add('active-pulse');

            setTimeout(() => {
                if (toDot) toDot.classList.remove('active-pulse');
                isTransitioning = false;
            }, 1000);
        }, 100);
    }, 600);

    // Update indicator during transition
    document.getElementById('slide-indicator').innerText = `${toSlideNum} / ${totalSlides}`;
}

function showSlide(n) {
    // Handle circular navigation
    if (n > totalSlides) n = 1;
    if (n < 1) n = totalSlides;

    if (n === currentSlide || isTransitioning) return;

    const fromSlide = currentSlide;
    currentSlide = n;

    magicMoveTransition(fromSlide, currentSlide);
}

function nextSlide() {
    if (isTransitioning) return;
    let nextSlideNum = currentSlide + 1;
    if (nextSlideNum > totalSlides) nextSlideNum = 1;
    showSlide(nextSlideNum);
}

function prevSlide() {
    if (isTransitioning) return;
    let prevSlideNum = currentSlide - 1;
    if (prevSlideNum < 1) prevSlideNum = totalSlides;
    showSlide(prevSlideNum);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Create anchor dots
    createAnchorDots();

    // Add Font Awesome if not already present
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    // Add transitions.css if not already present
    if (!document.querySelector('link[href="transitions.css"]')) {
        const transitionsCSS = document.createElement('link');
        transitionsCSS.rel = 'stylesheet';
        transitionsCSS.href = 'transitions.css';
        document.head.appendChild(transitionsCSS);
    }

    // Create transition overlay
    if (!document.getElementById('transition-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        overlay.id = 'transition-overlay';
        document.body.insertBefore(overlay, document.body.firstChild);
    }

    // Show first slide
    document.getElementById('slide-1').classList.add('active');
    document.getElementById('slide-indicator').innerText = `1 / ${totalSlides}`;

    console.log('✨ Magic Move Transitions Loaded!');
});
