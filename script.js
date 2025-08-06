// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// DOM Elements
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const watchOnYouTubeBtn = document.getElementById('watchOnYouTubeBtn');

// YouTube video URL (temporary placeholder)
const youtubeVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Video controls functionality
copyLinkBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(youtubeVideoUrl);
        
        // Visual feedback
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<span>✅</span> Link Copiado!';
        copyLinkBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
            copyLinkBtn.style.background = '';
        }, 2000);
        
    } catch (err) {
        console.error('Erro ao copiar link:', err);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = youtubeVideoUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Visual feedback
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<span>✅</span> Link Copiado!';
        copyLinkBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
            copyLinkBtn.style.background = '';
        }, 2000);
    }
});

watchOnYouTubeBtn.addEventListener('click', () => {
    window.open(youtubeVideoUrl, '_blank');
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.timeline()
    .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power2.out' })
    .from('.hero-subtitle', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.5')
    .from('.hero-author', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.3')
    .from('.hero-timeline', { duration: 1, y: 40, opacity: 0, ease: 'power2.out' }, '-=0.2')
    .from('.cta-button', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.2');

// Timeline items animation
gsap.from('.timeline-item', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
    delay: 1.5
});

// Parallax effect for hero background
gsap.to('.hero-background', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// Section animations
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section.querySelectorAll('.section-header'), {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Stats animation
gsap.utils.toArray('.stat-number').forEach(stat => {
    const finalValue = stat.textContent;
    gsap.from(stat, {
        duration: 2,
        textContent: 0,
        roundProps: 'textContent',
        ease: 'power2.out',
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Resource items animation
gsap.from('.resource-item', {
    duration: 0.8,
    x: -30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.resources-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Consolidation cards animation
gsap.from('.consolidation-card', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.consolidation-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Image hover effects
document.querySelectorAll('.main-image, .secondary-img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        gsap.to(img, { duration: 0.3, scale: 1.05, ease: 'power2.out' });
    });
    
    img.addEventListener('mouseleave', () => {
        gsap.to(img, { duration: 0.3, scale: 1, ease: 'power2.out' });
    });
});

// Button hover animations
document.querySelectorAll('.cta-button, .nav-download-btn, .video-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { duration: 0.3, y: -3, ease: 'power2.out' });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { duration: 0.3, y: 0, ease: 'power2.out' });
    });
});

// Card hover animations
document.querySelectorAll('.consolidation-card, .conflict-region').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { duration: 0.3, y: -5, ease: 'power2.out' });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { duration: 0.3, y: 0, ease: 'power2.out' });
    });
});

// Typing effect for quotes
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for the independence quote
const independenceQuote = document.querySelector('.quote-text');
if (independenceQuote) {
    const originalText = independenceQuote.textContent;
    
    ScrollTrigger.create({
        trigger: independenceQuote,
        start: 'top 80%',
        onEnter: () => {
            typeWriter(independenceQuote, originalText, 80);
        }
    });
}

// Intersection Observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.perspective-card, .transformation-item, .timeline-point').forEach(el => {
    observer.observe(el);
});

// Add CSS classes for observed animations
const style = document.createElement('style');
style.textContent = `
    .perspective-card, .transformation-item, .timeline-point {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .perspective-card.animate, .transformation-item.animate, .timeline-point.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, { duration: 0.5, opacity: 0, onComplete: () => loader.remove() });
    }
});

// Scroll to top functionality
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message for developers
console.log(`
🇧🇷 O Brasil: De Colônia a País Independente
📚 Trabalho de História por Reizon/Fernando Silva Liandro
🚀 Desenvolvido com HTML, CSS, JavaScript, AOS e GSAP
⭐ Site criado para fins educacionais
`);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Erro no site:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

