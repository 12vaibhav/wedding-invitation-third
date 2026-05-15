document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Smooth Scroll
  const lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Hero Parallax
  gsap.to('.hero-bg', {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Faster Fade In Up Animation for Sections
  const fadeUpElements = gsap.utils.toArray('.gsap-fade-up');
  fadeUpElements.forEach(elem => {
    const delay = elem.getAttribute('data-delay') || 0;
    gsap.fromTo(elem, 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: parseFloat(delay),
        ease: "power2.out",
        willChange: "transform, opacity",
        scrollTrigger: {
          trigger: elem,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Staggered Gallery Images
  ScrollTrigger.batch('.gallery-img-container', {
    interval: 0.1,
    batchMax: 3,
    onEnter: batch => gsap.fromTo(batch, {opacity: 0, y: 40}, {opacity: 1, y: 0, stagger: 0.1, overwrite: true, duration: 0.8, ease: "power2.out"}),
    start: "top 90%",
  });

  // Timeline items animation
  const timelineCards = gsap.utils.toArray('.timeline-card');
  timelineCards.forEach((card, i) => {
    gsap.fromTo(card,
      { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        }
      }
    );
  });

  // RSVP Form Submission Mock
  const rsvpForm = document.getElementById('rsvp-form');
  if(rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = rsvpForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      
      setTimeout(() => {
        btn.innerHTML = 'Thank You! <span class="ml-2">✨</span>';
        btn.classList.add('bg-green-700');
        rsvpForm.reset();
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-green-700');
        }, 3000);
      }, 1500);
    });
  }
});
