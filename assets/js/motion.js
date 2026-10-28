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
      const magnetics = document.querySelectorAll(
        '.btn-magnetic, .magnetic-item, .hero-actions .btn-primary-ila, .hero-actions .btn-secondary-ila, #btnQuickCourseFilter, .faculty-scroll-btn, .btn-register, .btn-submit-reg, .course-tab-btn'
      );
      magnetics.forEach(el => {
        el.addEventListener('mousemove', function (e) {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          if (typeof gsap !== 'undefined') {
            gsap.to(el, {
              x: x * 0.22,
              y: y * 0.22,
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
    const track = document.getElementById('facultyScrollTrack') || document.getElementById('facultyTrack');
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

  // Global helper for animating active hero slide content with GSAP
  window.animateHeroSlide = function (slideEl) {
    if (typeof gsap === 'undefined' || !slideEl) return;
    const tag = slideEl.querySelector('.hero-tag, .hero-badge, .badge-live-pulse');
    const title = slideEl.querySelector('.hero-title, h1');
    const desc = slideEl.querySelector('.hero-desc, p');
    const actions = slideEl.querySelector('.hero-actions');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (tag) tl.fromTo(tag, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.05);
    if (title) tl.fromTo(title, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.15);
    if (desc) tl.fromTo(desc, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.28);
    if (actions) tl.fromTo(actions, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.4);
  };

  // 4. GSAP ScrollTrigger Animations & Staggers
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero timeline reveal on initial page load (index.html)
    const activeHeroContent = document.querySelector('.hero-slide.active .hero-content') || document.querySelector('.hero-content');
    if (activeHeroContent) {
      window.animateHeroSlide(activeHeroContent);

      const quickChoose = document.querySelector('.choose-course-card');
      if (quickChoose) {
        gsap.from(quickChoose, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.out'
        });
      }
    }

    // Subtle Hero Background Parallax on Scroll (index.html)
    const heroBgs = document.querySelectorAll('.hero-slide .hero-bg');
    if (heroBgs.length > 0 && typeof ScrollTrigger !== 'undefined') {
      gsap.to(heroBgs, {
        scrollTrigger: {
          trigger: '#section-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 60,
        ease: 'none'
      });
    }

    // ScrollTrigger for sections and cards
    if (typeof ScrollTrigger !== 'undefined') {
      // Golden Commitment & USP Cards Stagger (index.html)
      const uspCards = document.querySelectorAll('.commitment-card, .usp-card, .usp-card-enhanced');
      if (uspCards.length > 0) {
        // Clear conflicting transition classes
        uspCards.forEach(c => c.classList.remove('scroll-reveal'));
        gsap.from(uspCards, {
          scrollTrigger: {
            trigger: uspCards[0].parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 32,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        });
      }

      // Bento Cards on gioi-thieu.html
      const bentoCards = document.querySelectorAll('.bento-card');
      if (bentoCards.length > 0) {
        bentoCards.forEach(c => c.classList.remove('scroll-reveal'));
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
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        });
      }

      // Campus photos subtle scroll zoom scrub (index.html)
      const campusPhotos = document.querySelectorAll('.space-card img, .campus-gallery-img');
      campusPhotos.forEach(img => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          scale: 1.06,
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
      const scrollPos = window.scrollY + window.innerHeight * 0.65;
      let activeCount = 0;

      nodes.forEach((node, idx) => {
        const top = node.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top) {
          node.classList.add('timeline-active');
          activeCount = idx + 1;
        } else {
          node.classList.remove('timeline-active');
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
  // Handles fast scrolling, click jumps, and bottom-of-page bounds reliably
  function initArticleTOC() {
    const tocLinks = document.querySelectorAll('#articleToc a, .toc-list a');
    const headings = document.querySelectorAll('.article-content h2, .article-content h3, .article-body h2, .article-body h3');
    if (!tocLinks.length || !headings.length) return;

    let clickLockUntil = 0;

    function setActiveTOC(id) {
      if (!id) return;
      tocLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active-toc');
        } else {
          link.classList.remove('active-toc');
        }
      });
    }

    function checkTOCPosition() {
      if (Date.now() < clickLockUntil) return;

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page: activate last item
      if (scrollY + windowHeight >= docHeight - 70) {
        setActiveTOC(headings[headings.length - 1].id);
        return;
      }

      // Find heading closest to top reading area
      let currentHeadingId = headings[0].id;
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 160) {
          currentHeadingId = heading.id;
        }
      });

      setActiveTOC(currentHeadingId);
    }

    window.addEventListener('scroll', checkTOCPosition, { passive: true });
    checkTOCPosition();

    // Smooth click handler on TOC links
    tocLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.getElementById(href.substring(1));
          if (target) {
            e.preventDefault();
            clickLockUntil = Date.now() + 1000;
            setActiveTOC(target.id);
            const topOffset = target.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: topOffset, behavior: 'smooth' });
          }
        }
      });
    });
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
