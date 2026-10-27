/**
 * SMARTEDU ACADEMY — MOTION & INTERACTIVE GSAP ENGINE (motion.js)
 * High-performance 2D dimensional micro-interactions & ScrollTrigger animations
 * Compliant with 60fps performance and zero-clutter standards
 */

(function () {
  'use strict';

  // 1. Reading Progress Bar (Fixed Top)
  function initReadingProgressBar() {
    let bar = document.getElementById('readingProgressBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'readingProgressBar';
      document.body.appendChild(bar);
    }

    window.addEventListener('scroll', function () {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        bar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
      }
    }, { passive: true });
  }

  // 2. Magnetic Buttons & Cards Hover Physics
  function initMagneticElements() {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const magnetics = document.querySelectorAll('.btn-magnetic, .magnetic-item');
      magnetics.forEach(el => {
        el.addEventListener('mousemove', function (e) {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          if (typeof gsap !== 'undefined') {
            gsap.to(el, {
              x: x * 0.2,
              y: y * 0.2,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });

        el.addEventListener('mouseleave', function () {
          if (typeof gsap !== 'undefined') {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: 'elastic.out(1, 0.4)'
            });
          }
        });
      });
    }
  }

  // 3. Faculty Track Scroll Progress Bar (index.html)
  function initFacultyProgress() {
    const track = document.getElementById('facultyTrack');
    const progressBar = document.querySelector('.faculty-scroll-progress-bar');
    if (!track || !progressBar) return;

    function updateProgress() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll > 0) {
        const ratio = track.scrollLeft / maxScroll;
        // Map from 25% minimum width to 100%
        const width = 25 + ratio * 75;
        progressBar.style.width = width + '%';
      }
    }

    track.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // 4. GSAP ScrollTrigger Animations & Staggers
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero timeline reveal (if on homepage)
    const heroContent = document.querySelector('.hero-content-col');
    if (heroContent) {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const badge = heroContent.querySelector('.hero-badge, .badge-live-pulse');
      const title = heroContent.querySelector('.hero-title, h1');
      const desc = heroContent.querySelector('.hero-desc, p');
      const actions = heroContent.querySelector('.hero-actions');
      const quickCards = document.querySelectorAll('.hero-quick-card');

      if (badge) heroTl.from(badge, { y: -15, opacity: 0, duration: 0.6 }, 0.1);
      if (title) heroTl.from(title, { y: 25, opacity: 0, duration: 0.8 }, 0.2);
      if (desc) heroTl.from(desc, { y: 20, opacity: 0, duration: 0.7 }, 0.35);
      if (actions) heroTl.from(actions, { y: 15, opacity: 0, duration: 0.6 }, 0.5);
      if (quickCards.length > 0) {
        heroTl.from(quickCards, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.6);
      }
    }

    // ScrollTrigger for sections and cards
    if (typeof ScrollTrigger !== 'undefined') {
      // Golden USP Cards Stagger
      const uspCards = document.querySelectorAll('.usp-card, .usp-card-enhanced');
      if (uspCards.length > 0) {
        gsap.from(uspCards, {
          scrollTrigger: {
            trigger: uspCards[0].parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out'
        });
      }

      // Bento Cards on gioi-thieu.html
      const bentoCards = document.querySelectorAll('.bento-card');
      if (bentoCards.length > 0) {
        gsap.from(bentoCards, {
          scrollTrigger: {
            trigger: bentoCards[0].parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }

      // Campus photos subtle scroll zoom scrub
      const campusPhotos = document.querySelectorAll('.campus-gallery-img');
      campusPhotos.forEach(img => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          scale: 1.04,
          ease: 'none'
        });
      });
    }
  }

  // 5. Syllabus Roadmap Timeline Active Tracker (chuong-trinh-hoc.html)
  function initRoadmapTimeline() {
    const nodes = document.querySelectorAll('.roadmap-step-node');
    const progressBar = document.querySelector('.roadmap-timeline-progress');
    if (!nodes.length || !progressBar) return;

    function checkActiveNodes() {
      const scrollPos = window.scrollY + window.innerHeight * 0.6;
      let activeCount = 0;

      nodes.forEach((node, idx) => {
        const top = node.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top) {
          node.classList.add('active');
          activeCount = idx + 1;
        } else {
          node.classList.remove('active');
        }
      });

      const total = nodes.length;
      if (total > 0) {
        const percent = Math.min(100, Math.max(0, (activeCount / total) * 100));
        progressBar.style.height = percent + '%';
      }
    }

    window.addEventListener('scroll', checkActiveNodes, { passive: true });
    checkActiveNodes();
  }

  // 6. Article TOC Active Heading Tracker (bai-viet-chi-tiet.html)
  function initArticleTOC() {
    const tocLinks = document.querySelectorAll('#articleToc a, .toc-list a');
    const headings = document.querySelectorAll('.article-content h2, .article-content h3, .article-body h2, .article-body h3');
    if (!tocLinks.length || !headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
              tocLinks.forEach(link => {
                if (link.getAttribute('href') === '#' + id) {
                  link.classList.add('active-toc');
                } else {
                  link.classList.remove('active-toc');
                }
              });
            }
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    headings.forEach(h => observer.observe(h));
  }

  // Initialize all motion modules when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    initReadingProgressBar();
    initMagneticElements();
    initFacultyProgress();
    initGSAPAnimations();
    initRoadmapTimeline();
    initArticleTOC();
  });

})();
