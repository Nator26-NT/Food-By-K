// ============================================================
// 1. DATA: SLIDER & SIGNATURE DISHES (Using provided images)
// ============================================================
const slideImages = [
    'images/1792239610253.jpg',
    'images/1792239615882.jpg',
    'images/1792239618970.jpg',
    'images/1792239622171.jpg',
    'images/1792239625619.jpg',
    'images/1792239634391.jpg',
    'images/1792239637368.jpg',
    'images/1792239640901.jpg',
    'images/1792239647590.jpg',
    'images/1792239652245.jpg',
    'images/1792239655460.jpg',
    'images/1792239659468.jpg',
    'images/1792239666344.jpg',
    'images/1792239676845.jpg',
    'images/1792239691520.jpg',
    'images/1792239730042.jpg',
    'images/1792239745070.jpg'
];

const fallbackImages = [
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K',
    'https://via.placeholder.com/1600x900?text=Food+By+K'
];

const signatureImages = [
    'images/1792239610253.jpg',
    'images/1792239625619.jpg',
    'images/1792239640901.jpg',
    'images/1792239659468.jpg',
    'images/1792239691520.jpg',
    'images/1792239745070.jpg'
];

// ============================================================
// 2. HERO SLIDER INITIALIZATION
// ============================================================
let currentSlide = 0;
let slideInterval;
const sliderContainer = document.getElementById('slider-container');
const dotsContainer = document.getElementById('slider-dots');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

function buildSlider() {
    if (!sliderContainer || !dotsContainer) return;
    sliderContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    slideImages.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url('${imgSrc}')`;

        const imgTest = new Image();
        imgTest.src = imgSrc;
        imgTest.onerror = () => {
            slide.style.backgroundImage = `url('${fallbackImages[index]}')`;
        };

        sliderContainer.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    resetSlideInterval();
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// ============================================================
// 3. SIGNATURE DISHES MARQUEE INITIALIZATION
// ============================================================
function buildMarquee() {
    const track = document.getElementById('marquee-track');
    if (!track) return;

    const allImages = [...signatureImages, ...signatureImages];

    allImages.forEach((imgSrc, index) => {
        const item = document.createElement('div');
        item.className = 'marquee-item';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Signature Dish';

        img.onerror = () => {
            const fallbackIndex = index % signatureImages.length;
            img.src = fallbackImages[fallbackIndex];
        };

        item.appendChild(img);
        track.appendChild(item);
    });
}

// ============================================================
// 4. SPA NAVIGATION (Page Switching)
// ============================================================
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });

    const navLinks = document.getElementById('nav-links');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }

    if (pageId === 'home') {
        resetSlideInterval();
    } else {
        clearInterval(slideInterval);
    }
}

document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = el.dataset.page;
        if (pageId) navigateTo(pageId);
    });
});

// ============================================================
// 5. MOBILE MENU & INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    buildSlider();
    buildMarquee();
    resetSlideInterval();

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    navigateTo('home');

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (!this.dataset.fallbackApplied) {
                this.dataset.fallbackApplied = 'true';
                const alt = this.alt || 'Image';
                this.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(alt)}`;
            }
        });
    });
});