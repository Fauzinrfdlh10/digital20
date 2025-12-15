/* ========================================
   Wedding Invitation - Gen Z Modern Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1200,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 100
    });

    // Create enhanced falling petals
    createFallingPetals();

    // Initialize particles.js
    initParticles();

    // Initialize opening cover
    initOpeningCover();

    // Initialize music control
    initMusicControl();

    // Initialize countdown with animation
    initCountdown();

    // Initialize gallery lightbox
    initLightbox();

    // Initialize forms
    initForms();

    // Initialize cursor trail
    initCursorTrail();

    // Initialize back to top button
    initBackToTop();

    // Timeline scroll progress
    initTimelineProgress();

    // GSAP Animations
    initGSAPAnimations();
});

/* ========================================
   Particles.js Configuration
   ======================================== */
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: ['#FFB6C1', '#FADADD', '#E8A0BF', '#C9A0DC'] },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 4, random: true },
                line_linked: { enable: false },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'top',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'bubble' },
                    onclick: { enable: true, mode: 'push' }
                },
                modes: {
                    bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 },
                    push: { particles_nb: 4 }
                }
            }
        });
    }
}

/* ========================================
   Enhanced Falling Petals
   ======================================== */
function createFallingPetals() {
    const container = document.querySelector('.flower-animation-container');
    if (!container) return;

    const petalCount = 40;
    const colors = [
        'linear-gradient(135deg, #FADADD 0%, #FFB6C1 100%)',
        'linear-gradient(135deg, #FFF0F5 0%, #F8BBD9 100%)',
        'linear-gradient(135deg, #FFFFFF 0%, #FADADD 100%)',
        'linear-gradient(135deg, #FFB6C1 0%, #E8A0BF 100%)',
        'linear-gradient(135deg, #E8D5F2 0%, #C9A0DC 100%)'
    ];
    const shapes = [
        'border-radius: 50% 0 50% 50%;',
        'border-radius: 50% 50% 0 50%;',
        'border-radius: 0 50% 50% 50%;',
        'border-radius: 50%;'
    ];

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = Math.random() * 18 + 8;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 8 + 10;
        const colorIndex = Math.floor(Math.random() * colors.length);
        const shapeIndex = Math.floor(Math.random() * shapes.length);
        const rotation = Math.random() * 360;

        petal.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: ${colors[colorIndex]};
            ${shapes[shapeIndex]}
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${Math.random() * 0.5 + 0.3};
            transform: rotate(${rotation}deg);
            filter: blur(${Math.random() * 1}px);
        `;

        container.appendChild(petal);
    }
}

/* ========================================
   Opening Cover with Enhanced Animation
   ======================================== */
function initOpeningCover() {
    const openBtn = document.getElementById('open-invitation');
    const cover = document.getElementById('opening-cover');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    if (openBtn && cover && mainContent) {
        openBtn.addEventListener('click', function () {
            // Add ripple effect
            createRippleEffect(this);

            // Animate cover out with GSAP if available
            if (typeof gsap !== 'undefined') {
                gsap.to(cover, {
                    opacity: 0,
                    scale: 1.1,
                    filter: 'blur(20px)',
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        cover.style.display = 'none';
                        mainContent.classList.remove('hidden');

                        // Animate main content in
                        gsap.from(mainContent, {
                            opacity: 0,
                            y: 50,
                            duration: 1,
                            ease: 'power3.out'
                        });

                        // Play music
                        if (bgMusic) {
                            bgMusic.volume = 0.4;
                            bgMusic.play().catch(e => console.log('Audio play failed:', e));
                        }

                        AOS.refresh();
                    }
                });
            } else {
                // Fallback animation
                cover.classList.add('fade-out');
                setTimeout(() => {
                    cover.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    if (bgMusic) {
                        bgMusic.volume = 0.4;
                        bgMusic.play().catch(e => console.log('Audio play failed:', e));
                    }
                    AOS.refresh();
                }, 800);
            }
        });
    }
}

function createRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.marginLeft = -size / 2 + 'px';
    ripple.style.marginTop = -size / 2 + 'px';

    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

/* ========================================
   Music Control with Visualizer
   ======================================== */
function initMusicControl() {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const visualizer = document.querySelector('.music-visualizer');

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', function () {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.log('Audio play failed:', e));
                musicToggle.classList.add('playing');
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                if (visualizer) visualizer.style.display = 'flex';
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                if (visualizer) visualizer.style.display = 'none';
            }
        });
    }
}

/* ========================================
   Enhanced Countdown Timer
   ======================================== */
function initCountdown() {
    const weddingDate = new Date('2025-03-15T08:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            animateNumber(daysEl, days);
            animateNumber(hoursEl, hours);
            animateNumber(minutesEl, minutes);
            animateNumber(secondsEl, seconds);
        }
    }

    function animateNumber(element, newValue) {
        if (!element) return;
        const currentValue = element.textContent;
        const formattedValue = String(newValue).padStart(2, '0');

        if (currentValue !== formattedValue) {
            element.style.transform = 'translateY(-10px)';
            element.style.opacity = '0';

            setTimeout(() => {
                element.textContent = formattedValue;
                element.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    element.style.transition = 'all 0.3s ease';
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                }, 50);
            }, 150);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ========================================
   Gallery Lightbox
   ======================================== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption');

            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';

            // GSAP animation
            if (typeof gsap !== 'undefined') {
                gsap.from(lightboxImg, {
                    scale: 0.5,
                    opacity: 0,
                    rotation: -10,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
    });

    function closeLightbox() {
        if (typeof gsap !== 'undefined') {
            gsap.to(lightboxImg, {
                scale: 0.5,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        } else {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* ========================================
   Form Handling
   ======================================== */
function initForms() {
    const rsvpForm = document.querySelector('.rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            showNotification(`Terima kasih ${name}! Konfirmasi kehadiran Anda telah kami terima. 🙏`, 'success');
            rsvpForm.reset();
        });
    }

    const wishForm = document.querySelector('.wish-form');
    if (wishForm) {
        wishForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('wish-name').value;
            const message = document.getElementById('wish-message').value;
            addWishToList(name, message);
            showNotification(`Terima kasih ${name}! Ucapan Anda telah terkirim. 💕`, 'success');
            wishForm.reset();
        });
    }
}

function addWishToList(name, message) {
    const wishList = document.querySelector('.wishes-list');
    if (!wishList) return;

    const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';
    wishCard.innerHTML = `
        <div class="wish-avatar gradient-avatar"><span>${initials}</span></div>
        <div class="wish-content">
            <div class="wish-header">
                <h4 class="wish-name">${escapeHtml(name)}</h4>
                <span class="wish-date">${dateStr}</span>
            </div>
            <p class="wish-text">${escapeHtml(message)}</p>
        </div>
    `;

    // Animate in
    wishCard.style.opacity = '0';
    wishCard.style.transform = 'translateX(-30px)';
    wishList.insertBefore(wishCard, wishList.firstChild);

    setTimeout(() => {
        wishCard.style.transition = 'all 0.5s ease';
        wishCard.style.opacity = '1';
        wishCard.style.transform = 'translateX(0)';
    }, 100);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ========================================
   Notification System
   ======================================== */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, #FF6B9D 0%, #C9A0DC 100%);
        color: white;
        padding: 18px 35px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1rem;
        font-weight: 500;
        box-shadow: 0 15px 40px rgba(255, 107, 157, 0.4);
        z-index: 3000;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

/* ========================================
   Copy to Clipboard
   ======================================== */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Berhasil disalin! 📋', 'success');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Berhasil disalin! 📋', 'success');
    });
}

/* ========================================
   Cursor Trail Effect
   ======================================== */
function initCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    if (!trail || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;

        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';

        requestAnimationFrame(animate);
    }
    animate();
}

/* ========================================
   Back to Top Button
   ======================================== */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========================================
   Timeline Progress
   ======================================== */
function initTimelineProgress() {
    const timelineProgress = document.querySelector('.timeline-progress');
    const timeline = document.querySelector('.timeline-modern');

    if (!timelineProgress || !timeline) return;

    window.addEventListener('scroll', () => {
        const rect = timeline.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1,
            (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
        ));
        timelineProgress.style.height = (scrollProgress * 100) + '%';
    });
}

/* ========================================
   GSAP Animations
   ======================================== */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect for flower ornaments
    gsap.utils.toArray('.parallax-element').forEach(el => {
        gsap.to(el, {
            y: 100,
            ease: 'none',
            scrollTrigger: {
                trigger: el.closest('section'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Stagger animation for timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Gallery hover effects enhancement
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });
}
