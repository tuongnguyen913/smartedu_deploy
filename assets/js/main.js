/**
 * SMARTEDU ACADEMY - ILA STYLE HOMEPAGE LOGIC (V2 REFINED)
 * Features:
 * 1. Hero Banner Slider (Autoplay, Hover Pause, Touch/Dots)
 * 2. Course Filtering (Quick Selector, Category Tabs, Megamenu & Topbar Triggers)
 * 3. 14 Faculty Members Master-Detail (Subject Filter & Rich Bio Modals)
 * 4. Hall of Greatness Student Honors (Category Tabs & Filter)
 * 5. Interactive Video Modal & Inline Player
 * 6. High-Conversion Lead Forms (Vietnamese Phone Validation, Confetti & Success Modal)
 * 7. Mobile Drawer Navigation (Auto-close on link click, restores scroll)
 * 8. Sticky Header & Back-to-Top
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HERO BANNER SLIDER
  initHeroSlider();

  // 2. ILA QUICK COURSE SELECTOR & TABS FILTER
  initCourseFiltering();

  // 3. 14 FACULTY MEMBERS (SUBJECT TABS & BIO MODAL)
  initFacultyShowcase();

  // 4. HALL OF GREATNESS (STUDENT ACHIEVEMENTS FILTER)
  initHallOfGreatness();

  // 5. VIDEO PLAYER MODAL
  initVideoModal();

  // 6. REGISTRATION FORMS (LEAD FORM & MODAL ASSESSMENT FORM)
  initRegistrationForms();

  // 7. STICKY HEADER & BACK-TO-TOP
  initStickyAndScroll();

  // 8. MOBILE MENU DRAWER (AUTO-CLOSE ON CLICK)
  initMobileMenu();

  // 9. SCROLLCRAFT ANIMATIONS (REVEAL & NUMBER COUNTERS)
  initScrollcraft();

  // 10. SUBPAGE MODULE INTERVENTIONS (ACCORDIONS, LIGHTBOX, MAP SWITCHER, FILTERS)
  initCurriculumAccordion();
  initLightbox();
  initMapSwitcher();
  initSubpageFilters();
});

/* -------------------------------------------------------------
   1. HERO BANNER SLIDER
------------------------------------------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const btnPrev = document.querySelector('.hero-btn-prev');
  const btnNext = document.querySelector('.hero-btn-next');
  let currentSlide = 0;
  let slideInterval = null;

  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
    if (window.animateHeroSlide && slides[index]) {
      window.animateHeroSlide(slides[index]);
    }
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoplay();
    });
  });

  const heroSection = document.querySelector('.hero-slider-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

/* -------------------------------------------------------------
   2. COURSE FILTERING (TABS + QUICK FORM + MEGAMENU & TOPBAR)
------------------------------------------------------------- */
function initCourseFiltering() {
  const tabButtons = document.querySelectorAll('.course-tab-btn');
  const courseCards = document.querySelectorAll('.course-item-card');
  const quickFilterBtn = document.getElementById('btnQuickCourseFilter');
  const selectLevel = document.getElementById('quickFilterLevel');
  const selectSubject = document.getElementById('quickFilterSubject');
  const megamenuLinks = document.querySelectorAll('.course-tab-link');
  const topbarCourseLinks = document.querySelectorAll('.topbar-course-link');

  // Tab button filter click
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter') || 'all';
      setActiveCourseTab(filterValue);
      filterCourses(filterValue, 'all');
    });
  });

  function setActiveCourseTab(filterValue) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue);
    });
  }

  // Quick Filter Form button in Hero overlap bar
  if (quickFilterBtn) {
    quickFilterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const levelVal = selectLevel ? selectLevel.value : 'all';
      const subjectVal = selectSubject ? selectSubject.value : 'all';

      setActiveCourseTab(levelVal);
      filterCourses(levelVal, subjectVal);

      // Smooth scroll to courses section
      const courseSec = document.getElementById('section-courses');
      if (courseSec) {
        courseSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      showToast(`Đã lọc danh sách khóa học phù hợp với nhu cầu của bạn!`);
    });
  }

  // Megamenu Links Click Handler
  megamenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filterVal = link.getAttribute('data-filter') || 'all';
      setActiveCourseTab(filterVal);
      filterCourses(filterVal, 'all');

      const courseSec = document.getElementById('section-courses');
      if (courseSec) {
        courseSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Topbar hashtag links click handler
  topbarCourseLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filterVal = link.getAttribute('data-filter') || 'all';
      setActiveCourseTab(filterVal);
      filterCourses(filterVal, 'all');
      
      const courseSec = document.getElementById('section-courses');
      if (courseSec) {
        courseSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  function filterCourses(level, subject) {
    let visibleCount = 0;

    courseCards.forEach(card => {
      const cardLevel = card.getAttribute('data-level') || '';
      const cardSubject = card.getAttribute('data-subject') || '';

      const matchLevel = (level === 'all' || cardLevel.includes(level));
      const matchSubject = (subject === 'all' || cardSubject.includes(subject));

      if (matchLevel && matchSubject) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Also highlight matching tuition table row on chuong-trinh-hoc.html
    const tuitionRows = document.querySelectorAll('.tuition-table tbody tr');
    if (tuitionRows.length > 0) {
      tuitionRows.forEach(row => {
        const rowLevel = row.getAttribute('data-level') || '';
        if (level === 'all' || rowLevel.includes(level)) {
          row.style.opacity = '1';
          if (level !== 'all') {
            row.style.backgroundColor = 'rgba(216, 24, 36, 0.05)';
            row.style.transition = 'background-color 0.3s ease, opacity 0.3s ease';
          } else {
            row.style.backgroundColor = '';
          }
        } else {
          row.style.opacity = '0.4';
          row.style.backgroundColor = '';
        }
      });
    }

    // Also sync with sticky form dropdown on chuong-trinh-hoc.html
    const stickyGrade = document.getElementById('stickyGrade');
    if (stickyGrade && level !== 'all') {
      if (level === 'cap1') stickyGrade.value = 'cap1';
      else if (level === 'cap2') stickyGrade.value = 'lop6';
      else if (level === 'tuyensinh10') stickyGrade.value = 'lop9';
      else if (level === 'cap3' || level === 'daihoc') stickyGrade.value = 'cap3';
    }

    const noResultMsg = document.getElementById('noCoursesFound');
    if (noResultMsg) {
      noResultMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }
}

/* -------------------------------------------------------------
   3. 14 FACULTY MEMBERS (SUBJECT TABS & BIO MODAL)
------------------------------------------------------------- */
const facultyData = {
  1: {
    name: "ThS. Nguyễn Thanh Tùng",
    subject: "Chủ Tịch Hội Đồng Chuyên Môn • Trưởng Bộ Môn Toán",
    degree: "Thạc sĩ Toán giải tích — ĐH Sư phạm TP.HCM",
    exp: "14 năm kinh nghiệm giảng dạy & bồi dưỡng học sinh giỏi",
    achieve: "Đã trực tiếp đào tạo hơn 200 học sinh đỗ Chuyên Toán Lê Hồng Phong, Mạc Đĩnh Chi và đạt điểm 9 - 10 kỳ thi Tuyển sinh 10.",
    philosophy: "Toán học không phải là học thuộc công thức, mà là chìa khóa mở lối tư duy phản biện và năng lực giải quyết vấn đề thực tiễn.",
    img: "assets/images/teachers/teacher-1.jpg"
  },
  2: {
    name: "ThS. Lê Thu Thảo",
    subject: "Phó Chủ Tịch Hội Đồng • Tổ Trưởng Bộ Môn Ngữ Văn",
    degree: "Thạc sĩ Văn học Việt Nam — ĐH Sư phạm TP.HCM",
    exp: "12 năm kinh nghiệm luyện thi vào lớp 10 & THPT Quốc Gia",
    achieve: "Tác giả phương pháp 'Sơ đồ tư duy mở rộng cảm xúc', dẫn dắt hàng ngàn học sinh đạt điểm 8.5+ Ngữ văn qua các kỳ thi tuyển sinh.",
    philosophy: "Học Văn là học làm Người, học cách thấu cảm và tự tin diễn đạt góc nhìn, tiếng nói riêng của bản thân trước cuộc sống.",
    img: "assets/images/teachers/teacher-2.jpg"
  },
  3: {
    name: "ThS. Hoàng Minh Đức",
    subject: "Tổ Trưởng Bộ Môn Tiếng Anh Học Thuật",
    degree: "Thạc sĩ Giảng dạy Tiếng Anh (TESOL) — ĐH Sư phạm TP.HCM",
    exp: "IELTS 8.5 • 10 năm đào tạo chuyên sâu tiếng Anh học thuật & Cambridge",
    achieve: "Huấn luyện đội tuyển HSG Tiếng Anh Quận 6; tỷ lệ học sinh đỗ lớp 10 Chuyên Anh đạt 88%, điểm TB Anh thi vào 10 đạt 8.85.",
    philosophy: "Ngôn ngữ là phản xạ tự nhiên. SmartEdu tạo môi trường kích hoạt năng lực giao tiếp và tư duy bằng Anh ngữ mỗi ngày.",
    img: "assets/images/teachers/teacher-3.jpg"
  },
  4: {
    name: "ThS. Trần Quốc Bảo",
    subject: "Tổ Trưởng Tổ Khoa Học Tự Nhiên & Vật Lý",
    degree: "Thạc sĩ Vật lý lý thuyết — ĐH Khoa học Tự nhiên TP.HCM",
    exp: "9 năm kinh nghiệm bồi dưỡng học sinh thi Đánh giá năng lực ĐHQG & THPTQG",
    achieve: "Chuyên gia phân tích cấu trúc đề thi trắc nghiệm hiện đại, dẫn dắt học sinh đạt điểm 9+ môn Vật lý các kỳ thi tuyển sinh.",
    philosophy: "Mỗi hiện tượng vật lý đều bắt nguồn từ thực tế. Khi hiểu được bản chất, việc giải các bài toán phức tạp trở nên vô cùng say mê.",
    img: "assets/images/teachers/teacher-4.jpg"
  },
  5: {
    name: "Thầy Trần Minh Tuấn",
    subject: "Chuyên Gia Luyện Thi Tuyển Sinh 10 Môn Toán",
    degree: "Cử nhân Sư phạm Toán chất lượng cao — ĐH Sư phạm TP.HCM",
    exp: "11 năm kinh nghiệm bứt phá điểm số cho học sinh mất gốc",
    achieve: "Chuyên gia huấn luyện chuyên đề 'Giải toán bằng cách lập phương trình' và 'Hình học thực tế' sát 100% ma trận đề Sở GD&ĐT.",
    philosophy: "Không có học sinh dốt Toán, chỉ có học sinh chưa được chỉ dẫn đúng chìa khóa tư duy phù hợp với năng lực của mình.",
    img: "assets/images/teachers/teacher-5.jpg"
  },
  6: {
    name: "Cô Nguyễn Thị Kim Cương",
    subject: "Giảng Viên Toán Tư Duy Tiểu Học & THCS",
    degree: "Cử nhân Giáo dục Tiểu học & Sư phạm Toán — ĐH Sư phạm TP.HCM",
    exp: "8 năm kinh nghiệm giảng dạy toán tư duy Singapore & Soroban",
    achieve: "Giúp hơn 350 học sinh chuyển cấp từ Lớp 5 lên 6 tự tin làm quen môi trường học tập mới và giữ vững danh hiệu Học sinh Xuất sắc.",
    philosophy: "Gieo mầm tình yêu với những con số từ nhỏ bằng trò chơi logic trực quan là nền tảng vững vàng nhất cho cả hành trình học thuật.",
    img: "assets/images/teachers/teacher-6.jpg"
  },
  7: {
    name: "Thầy Đỗ Hoàng Long",
    subject: "Giảng Viên Toán THPT & Luyện Thi ĐGNL",
    degree: "Cử nhân Sư phạm Toán — ĐH Sư phạm TP.HCM",
    exp: "7 năm kinh nghiệm bồi dưỡng khối A & A1",
    achieve: "Sở hữu ngân hàng 5,000+ câu hỏi phân loại điểm 8 - 9+ và kỹ thuật bấm máy tính Casio tối ưu thời gian làm bài dưới 30 giây/câu.",
    philosophy: "Kỷ luật trong luyện đề và sắc bén trong chiến thuật phân bổ thời gian sẽ mang lại điểm số cao nhất trong phòng thi.",
    img: "assets/images/teachers/teacher-7.jpg"
  },
  8: {
    name: "Cô Phạm Thanh Nhàn",
    subject: "Giảng Viên Ngữ Văn THCS & Bồi Dưỡng Lớp 9",
    degree: "Cử nhân Sư phạm Ngữ Văn — ĐH Sư phạm TP.HCM",
    exp: "10 năm kinh nghiệm rèn kỹ năng viết văn chuẩn mực",
    achieve: "100% học sinh lớp 9 do cô kèm đạt điểm trên 7.5 môn Ngữ văn trong kỳ thi Tuyển sinh 10 vào các trường công lập trọng điểm Q.6.",
    philosophy: "Lời văn đẹp phải bắt nguồn từ trái tim nhân ái và lập luận logic. Văn học rèn cho các con cả trí tuệ lẫn tâm hồn thanh khiết.",
    img: "assets/images/teachers/teacher-8.jpg"
  },
  9: {
    name: "Cô Vũ Mai Phương",
    subject: "Giảng Viên Rèn Chữ & Tiếng Việt Tiểu Học",
    degree: "Cử nhân Giáo dục Tiểu học — ĐH Sư phạm TP.HCM",
    exp: "8 năm kinh nghiệm uốn nắn nét chữ & nếp học sinh",
    achieve: "Chuyên gia rèn tư thế ngồi chuẩn, sửa phát âm ngọng và bồi dưỡng kỹ năng đọc hiểu cho học sinh lớp 1 đến lớp 5 tại Quận 6.",
    philosophy: "Nét chữ là nết người. Từng nét bút cẩn thận hôm nay sẽ rèn nên đức tính kiên nhẫn và chỉn chu cho con mai sau.",
    img: "assets/images/teachers/teacher-9.jpg"
  },
  10: {
    name: "Cô Đặng Bích Ngọc",
    subject: "Giảng Viên Tiếng Anh Học Thuật & Chuyên Sâu",
    degree: "Cử nhân Sư phạm Tiếng Anh — ĐH Sư phạm TP.HCM • IELTS 8.0",
    exp: "9 năm đào tạo ngữ pháp chuyên sâu & luyện thi vào 10 Chuyên",
    achieve: "Tỷ lệ học sinh đạt điểm 9 - 10 môn Tiếng Anh trong kỳ thi Tuyển sinh 10 đạt 78%, nhiều em đạt học bổng trường chuyên ngữ.",
    philosophy: "Học ngoại ngữ cần sự kiên trì tích lũy mỗi ngày. SmartEdu biến tiếng Anh từ môn học áp lực thành niềm đam mê khám phá thế giới.",
    img: "assets/images/teachers/teacher-10.jpg"
  },
  11: {
    name: "Thầy Bùi Anh Tuấn",
    subject: "Giảng Viên Tiếng Anh Cambridge & Giao Tiếp",
    degree: "Cử nhân Sư phạm Tiếng Anh — ĐH Sài Gòn • Khen thưởng GV Xuất sắc",
    exp: "7 năm huấn luyện chứng chỉ Starters, Movers, Flyers, KET, PET",
    achieve: "100% học sinh đạt chứng chỉ Cambridge với số khiên tối đa (14-15 khiên), tự tin giao tiếp cùng người bản xứ.",
    philosophy: "Phá bỏ rào cản sợ sai là bước đầu tiên để làm chủ một ngôn ngữ quốc tế.",
    img: "assets/images/teachers/teacher-11.jpg"
  },
  12: {
    name: "ThS. Vũ Đức Trọng",
    subject: "Chuyên Viên Hóa Học THCS & THPT",
    degree: "Thạc sĩ Hóa học Hữu cơ — ĐH Sư phạm TP.HCM",
    exp: "10 năm giảng dạy chuyên đề Hóa học thực nghiệm",
    achieve: "Xây dựng phương pháp 'Bản đồ chuỗi phản ứng hóa học trực quan', biến môn Hóa từ nỗi ám ảnh thành môn gỡ điểm số cao.",
    philosophy: "Hóa học là thế giới kỳ diệu của các liên kết. Hiểu bản chất phản ứng giúp học sinh không bao giờ phải học vẹt phương trình.",
    img: "assets/images/teachers/teacher-12.jpg"
  },
  13: {
    name: "Cô Lê Ngọc Diệp",
    subject: "Giảng Viên Khoa Học Tự Nhiên & Sinh Học",
    degree: "Cử nhân Sư phạm Sinh học — ĐH Sư phạm TP.HCM",
    exp: "8 năm kinh nghiệm giảng dạy KHTN tích hợp theo chương trình GDPT mới",
    achieve: "Giải Ba Giáo viên dạy giỏi cấp Thành phố, hướng dẫn học sinh đạt nhiều giải cao trong các cuộc thi Nghiên cứu khoa học kỹ thuật.",
    philosophy: "Giáo dục khoa học là nuôi dưỡng sự tò mò vô tận của trẻ thơ trước thế giới tự nhiên kỳ vĩ.",
    img: "assets/images/teachers/teacher-13.jpg"
  },
  14: {
    name: "Thầy Nguyễn Văn Hưng",
    subject: "Giảng Viên Vật Lý Ứng Dụng & KHTN",
    degree: "Cử nhân Sư phạm Vật Lý — ĐH Khoa học Tự nhiên TP.HCM",
    exp: "9 năm kinh nghiệm luyện đề thi Đánh giá năng lực ĐHQG",
    achieve: "Chuyên gia bồi dưỡng các chuyên đề Điện xoay chiều, Sóng ánh sáng và Dao động cơ cho học sinh lớp 11 - 12.",
    philosophy: "Kiến thức là vũ khí, phương pháp là con đường, và sự kiên trì là đích đến của mọi thành công học thuật.",
    img: "assets/images/teachers/teacher-14.jpg"
  }
};

function initFacultyShowcase() {
  const bioButtons = document.querySelectorAll('.faculty-btn-bio');
  const modal = document.getElementById('facultyModal') || document.getElementById('modalFacultyBio');
  const closeBtn = document.getElementById('closeFacultyModal') || document.getElementById('modalFacultyClose');
  const facultyTabBtns = document.querySelectorAll('.faculty-tab-btn');
  const facultyCards = document.querySelectorAll('.faculty-card');

  // Department Tab Filter for Faculty
  facultyTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      facultyTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      const matchingCards = [];
      facultyCards.forEach(card => {
        const dept = card.getAttribute('data-department') || '';
        if (filterVal === 'all' || dept.includes(filterVal)) {
          card.style.display = 'flex';
          matchingCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });

      if (typeof gsap !== 'undefined' && matchingCards.length > 0) {
        gsap.fromTo(matchingCards,
          { opacity: 0, y: 15, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out', clearProps: 'transform' }
        );
      } else {
        matchingCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        });
      }
    });
  });

  if (!modal) return;

  // Open Teacher Bio Modal
  bioButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id') || 1;
      const data = facultyData[id] || facultyData[1];

      const elName = document.getElementById('modalFacultyName');
      const elSub = document.getElementById('modalFacultySubject');
      const elDeg = document.getElementById('modalFacultyDegree');
      const elExp = document.getElementById('modalFacultyExp');
      const elAch = document.getElementById('modalFacultyAchieve');
      const elPhil = document.getElementById('modalFacultyPhilosophy') || document.getElementById('modalFacultyQuote');
      const elImg = document.getElementById('modalFacultyImg');

      if (elName) elName.textContent = data.name;
      if (elSub) elSub.textContent = data.subject;
      if (elDeg) elDeg.textContent = data.degree;
      if (elExp) elExp.textContent = data.exp;
      if (elAch) elAch.textContent = data.achieve;
      if (elPhil) elPhil.textContent = `"${data.philosophy}"`;
      if (elImg) elImg.src = data.img;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Horizontal Scroll Navigation for Faculty Showcase (Home)
  const scrollTrack = document.getElementById('facultyScrollTrack');
  const prevBtn = document.getElementById('facultyScrollPrev');
  const nextBtn = document.getElementById('facultyScrollNext');

  if (scrollTrack) {
    function updateFacultyNavArrows() {
      if (!prevBtn || !nextBtn) return;
      const atStart = scrollTrack.scrollLeft <= 8;
      const atEnd = scrollTrack.scrollLeft + scrollTrack.clientWidth >= scrollTrack.scrollWidth - 8;
      
      prevBtn.disabled = atStart;
      prevBtn.classList.toggle('disabled', atStart);
      prevBtn.setAttribute('aria-disabled', atStart ? 'true' : 'false');

      nextBtn.disabled = atEnd;
      nextBtn.classList.toggle('disabled', atEnd);
      nextBtn.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
    }

    let isScrolling = false;
    function handleScrollClick(direction) {
      if (isScrolling) return;
      isScrolling = true;
      const scrollAmount = direction * 340;
      scrollTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(() => {
        isScrolling = false;
        updateFacultyNavArrows();
      }, 350);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => handleScrollClick(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => handleScrollClick(1));
    }

    scrollTrack.addEventListener('scroll', updateFacultyNavArrows, { passive: true });
    window.addEventListener('resize', updateFacultyNavArrows, { passive: true });
    // Initial sync
    setTimeout(updateFacultyNavArrows, 100);

    // Mouse Drag Scroll for Desktop
    let isDown = false;
    let startX = 0;
    let scrollLeftPos = 0;

    scrollTrack.addEventListener('mousedown', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      isDown = true;
      scrollTrack.style.cursor = 'grabbing';
      scrollTrack.style.scrollSnapType = 'none';
      scrollTrack.style.scrollBehavior = 'auto';
      startX = e.pageX - scrollTrack.offsetLeft;
      scrollLeftPos = scrollTrack.scrollLeft;
    });

    const stopDragging = () => {
      if (isDown) {
        isDown = false;
        scrollTrack.style.cursor = '';
        scrollTrack.style.scrollSnapType = '';
        scrollTrack.style.scrollBehavior = '';
        updateFacultyNavArrows();
      }
    };

    window.addEventListener('mouseup', stopDragging);
    scrollTrack.addEventListener('mouseleave', stopDragging);

    scrollTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollTrack.scrollLeft = scrollLeftPos - walk;
    });
  }
}

/* -------------------------------------------------------------
   4. HALL OF GREATNESS (STUDENT ACHIEVEMENTS FILTER)
------------------------------------------------------------- */
function initHallOfGreatness() {
  const tabBtns = document.querySelectorAll('.hall-tab-btn');
  const hallCards = document.querySelectorAll('.hall-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      hallCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   5. VIDEO PLAYER MODAL & HERO VIDEO
------------------------------------------------------------- */
function initVideoModal() {
  const openVideoBtns = document.querySelectorAll('.open-video-modal');
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('closeVideoModal');
  const videoPlayer = document.getElementById('modalVideoPlayer');

  if (!modal) return;

  openVideoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      if (videoPlayer) {
        videoPlayer.currentTime = 0;
        videoPlayer.play().catch(() => {});
      }
    });
  });

  function closeVideo() {
    modal.classList.remove('active');
    if (videoPlayer) {
      videoPlayer.pause();
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideo);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });
}

/* -------------------------------------------------------------
   6. REGISTRATION FORMS (LEAD FORM + ASSESSMENT MODAL)
------------------------------------------------------------- */
function initRegistrationForms() {
  const leadForm = document.getElementById('leadRegistrationForm');
  const contactForm = document.getElementById('contactPageForm');
  const modalAssessForm = document.getElementById('modalAssessmentForm');
  const assessmentModal = document.getElementById('assessmentModal') || document.getElementById('modalAssessment');
  const successModal = document.getElementById('successModal');
  const closeSuccessBtn = document.getElementById('closeSuccessModal');
  const closeAssessBtn = document.getElementById('closeAssessmentModal') || document.getElementById('modalAssessmentClose');
  const openAssessBtns = document.querySelectorAll('.open-assessment-modal');
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

  // Handle Assessment Modal Triggers (Pre-select grade if provided)
  openAssessBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetGrade = btn.getAttribute('data-grade');
      if (targetGrade) {
        const modalGradeSelect = document.getElementById('modalRegGrade') || document.getElementById('modalGrade');
        if (modalGradeSelect) {
          modalGradeSelect.value = targetGrade;
        }
      }
      if (assessmentModal) {
        assessmentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeAssessBtn && assessmentModal) {
    closeAssessBtn.addEventListener('click', () => {
      assessmentModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (assessmentModal) {
    assessmentModal.addEventListener('click', (e) => {
      if (e.target === assessmentModal) {
        assessmentModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 1. Submit Lead Registration Form (Section 13)
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('regName');
      const phoneInput = document.getElementById('regPhone');
      const gradeInput = document.getElementById('regGrade');
      const campusInput = document.getElementById('regCampus');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const grade = gradeInput ? gradeInput.value : '';
      const campus = campusInput ? campusInput.value : '';

      if (!name) {
        alert('Vui lòng nhập họ và tên của Quý Phụ huynh / Học sinh.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Vui lòng nhập số điện thoại liên hệ hợp lệ của Việt Nam (10 chữ số).');
        if (phoneInput) phoneInput.focus();
        return;
      }

      triggerConfetti();

      if (successModal) {
        const summaryName = document.getElementById('summaryRegName');
        const summaryPhone = document.getElementById('summaryRegPhone');
        const summaryGrade = document.getElementById('summaryRegGrade');
        const summaryCampus = document.getElementById('summaryRegCampus');
        if (summaryName) summaryName.textContent = name;
        if (summaryPhone) summaryPhone.textContent = phone;
        if (summaryGrade) summaryGrade.textContent = grade || 'Lớp bồi dưỡng theo nhu cầu';
        if (summaryCampus) summaryCampus.textContent = campus || 'Cơ sở 1 (Đường Số 6, Q.6)';
        successModal.classList.add('active');
      }

      showToast('Đăng ký tư vấn thành công! SmartEdu sẽ liên hệ trong vòng 15 phút.');
      leadForm.reset();
    });
  }

  // 1b. Submit Contact Page Lead Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const phoneInput = document.getElementById('contactPhone');
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';

      if (!name) {
        alert('Vui lòng nhập họ và tên của Quý Phụ huynh / Học sinh.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Vui lòng nhập số điện thoại liên hệ hợp lệ của Việt Nam (10 chữ số).');
        if (phoneInput) phoneInput.focus();
        return;
      }

      triggerConfetti();
      showToast('Gửi yêu cầu tư vấn thành công! Chuyên viên học vụ SmartEdu sẽ liên hệ lại trong 15 phút.');
      contactForm.reset();
    });
  }

  // 2. Submit Modal Assessment Form
  if (modalAssessForm) {
    modalAssessForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('modalRegName') || document.getElementById('modalName');
      const phoneInput = document.getElementById('modalRegPhone') || document.getElementById('modalPhone');
      const gradeInput = document.getElementById('modalRegGrade') || document.getElementById('modalGrade');
      const campusInput = document.getElementById('modalRegCampus') || document.getElementById('modalCampus');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const grade = gradeInput ? gradeInput.value : '';
      const campus = campusInput ? campusInput.value : '';

      if (!name) {
        alert('Vui lòng nhập họ và tên.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phone || !phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Vui lòng nhập số điện thoại hợp lệ của Việt Nam (10 chữ số).');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (assessmentModal) {
        assessmentModal.classList.remove('active');
        document.body.style.overflow = '';
      }

      triggerConfetti();

      if (successModal) {
        const summaryName = document.getElementById('summaryRegName');
        const summaryPhone = document.getElementById('summaryRegPhone');
        const summaryGrade = document.getElementById('summaryRegGrade');
        const summaryCampus = document.getElementById('summaryRegCampus');
        if (summaryName) summaryName.textContent = name;
        if (summaryPhone) summaryPhone.textContent = phone;
        if (summaryGrade) summaryGrade.textContent = grade || 'Đánh giá năng lực đầu vào 0đ';
        if (summaryCampus) summaryCampus.textContent = campus || 'Cơ sở 1 (Đường Số 6, Q.6)';
        successModal.classList.add('active');
      }

      showToast('Đăng ký kiểm tra đầu vào 0đ thành công! Thầy cô SmartEdu sẽ gọi xác nhận lịch trong 30 phút.');
      modalAssessForm.reset();
    });
  }

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) successModal.classList.remove('active');
    });
  }
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  }
}

/* -------------------------------------------------------------
   7. STICKY HEADER & BACK-TO-TOP
------------------------------------------------------------- */
function initStickyAndScroll() {
  const header = document.querySelector('.main-header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header sticky effect
    if (header) {
      header.classList.toggle('scrolled', scrollY > 60);
    }

    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* -------------------------------------------------------------
   8. MOBILE MENU DRAWER (AUTO-CLOSING ON LINK CLICK)
------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuToggle') || document.getElementById('btnOpenMobileMenu');
  const mobileDrawer = document.getElementById('mobileMenuDrawer') || document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileMenuClose') || document.getElementById('btnCloseMobileMenu');
  const mobileOverlay = document.getElementById('mobileDrawerOverlay');

  if (!mobileToggle || !mobileDrawer) return;

  function openDrawer() {
    mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', openDrawer);

  if (mobileClose) {
    mobileClose.addEventListener('click', closeDrawer);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeDrawer);
  }

  // Close when clicking outside drawer content
  mobileDrawer.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) closeDrawer();
  });

  // CRITICAL: Close drawer when any anchor link or button inside drawer is clicked!
  const drawerLinks = mobileDrawer.querySelectorAll('a, button');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* Helper Toast Notification */
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMessage');
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}

/* -------------------------------------------------------------
   9. SCROLLCRAFT ANIMATIONS (REVEAL & PROOF NUMBER COUNTERS)
------------------------------------------------------------- */
function initScrollcraft() {
  // Staggered Scroll Reveal
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in-view'));
  }

  // Animated Number Counters on Scroll
  const counterElements = document.querySelectorAll('.counter-value');
  if ('IntersectionObserver' in window && counterElements.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach(el => counterObserver.observe(el));
  }
}

function animateCounter(el) {
  const targetStr = el.getAttribute('data-target') || el.textContent.trim();
  const hasPercent = targetStr.includes('%');
  const hasPlus = targetStr.includes('+');
  const isDecimal = targetStr.includes('.');
  const numericVal = parseFloat(targetStr.replace(/[^0-9.]/g, ''));

  if (isNaN(numericVal)) return;

  const duration = 1600;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth easeOutExpo curve
    const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const currentVal = (numericVal * easeOut);

    const formatted = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);
    el.textContent = `${formatted}${hasPlus ? '+' : ''}${hasPercent ? '%' : ''}`;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = targetStr;
    }
  }

  requestAnimationFrame(updateCount);
}

/* -------------------------------------------------------------
   10. CURRICULUM ACCORDION (MODULE 6: COURSES)
------------------------------------------------------------- */
function initCurriculumAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.accordion-item');
      if (!parent) return;

      const wasActive = parent.classList.contains('active');
      // Optional: close other accordions in the same wrapper
      const siblingItems = parent.parentElement.querySelectorAll('.accordion-item');
      siblingItems.forEach(item => item.classList.remove('active'));

      if (!wasActive) {
        parent.classList.add('active');
      }
    });
  });

  // Legal accordion on gioi-thieu.html
  const legalHeaders = document.querySelectorAll('.legal-accordion-header');
  legalHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.legal-accordion-item');
      if (!parent) return;
      parent.classList.toggle('active');
    });
  });
}

/* -------------------------------------------------------------
   11. LIGHTBOX GALLERY (MODULE 5: MEDIA)
------------------------------------------------------------- */
function initLightbox() {
  const mediaCards = document.querySelectorAll('.media-card[data-type="image"], [data-lightbox]');
  const lightboxModal = document.getElementById('lightboxModal');
  if (!lightboxModal) return;

  const lightboxImg = lightboxModal.querySelector('.lightbox-content img');
  const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
  const closeBtn = lightboxModal.querySelector('.lightbox-close-btn');
  const prevBtn = lightboxModal.querySelector('.lightbox-prev-btn');
  const nextBtn = lightboxModal.querySelector('.lightbox-next-btn');

  let imageList = [];
  let currentIndex = 0;

  mediaCards.forEach((card, index) => {
    const imgEl = card.querySelector('img');
    const titleEl = card.querySelector('.media-card-title, h4, h3');
    if (imgEl) {
      const src = card.getAttribute('data-full-img') || imgEl.getAttribute('src');
      const caption = titleEl ? titleEl.textContent.trim() : (imgEl.getAttribute('alt') || 'SmartEdu Gallery');
      imageList.push({ src, caption });

      card.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = index;
        openLightbox(currentIndex);
      });
    }
  });

  function openLightbox(index) {
    if (!imageList[index]) return;
    lightboxImg.src = imageList[index].src;
    lightboxImg.alt = imageList[index].caption;
    if (lightboxCaption) lightboxCaption.textContent = imageList[index].caption;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    currentIndex = (currentIndex + 1) % imageList.length;
    openLightbox(currentIndex);
  }

  function prevLightbox() {
    currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    openLightbox(currentIndex);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevLightbox);

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });
}

/* -------------------------------------------------------------
   12. INTERACTIVE GOOGLE MAP SWITCHER (MODULE 7: CONTACT)
------------------------------------------------------------- */
function initMapSwitcher() {
  const mapButtons = document.querySelectorAll('.map-tab-btn');
  const mapIframe = document.getElementById('googleMapIframe');
  const campusCards = document.querySelectorAll('.campus-detail-card');

  const campusMaps = {
    cs1: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.822818987178!2d106.6321528!3d10.7480572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e7a39d89953%3A0xe100938ff5d59015!2zMDEgxJDGsOG7nW5nIHPhu5EgNiwgUGjGsOG7nW5nIDExLCBRdeG6rW4gNiwgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
    cs2: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.837837138379!2d106.6341258!3d10.7468925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e79603e9ff7%3A0x6b8bcbb6611388b1!2zMTcgxJDGsOG7nW5nIENo4bujIEzhu5tuLCBQaMaw4budbmcgMTEsIFF14bqtbiA2LCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s'
  };

  mapButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCampus = btn.getAttribute('data-campus');
      if (campusMaps[targetCampus] && mapIframe) {
        mapIframe.src = campusMaps[targetCampus];
      }

      mapButtons.forEach(b => b.classList.toggle('active', b === btn));
      campusCards.forEach(card => {
        card.classList.toggle('active', card.getAttribute('data-campus') === targetCampus);
      });
    });
  });

  // Direct map triggers from campus cards
  const cardTriggers = document.querySelectorAll('.trigger-map-campus');
  cardTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const campus = trigger.getAttribute('data-campus');
      const matchingBtn = document.querySelector(`.map-tab-btn[data-campus="${campus}"]`);
      if (matchingBtn) matchingBtn.click();
      const mapSection = document.getElementById('mapSection');
      if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Clicking anywhere on campus-detail-card switches map
  campusCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const campus = card.getAttribute('data-campus');
      const matchingBtn = document.querySelector(`.map-tab-btn[data-campus="${campus}"]`);
      if (matchingBtn) matchingBtn.click();
    });
  });
}

/* -------------------------------------------------------------
   13. SUBPAGE FILTERS (NEWS & MEDIA TABS)
------------------------------------------------------------- */
function initSubpageFilters() {
  // News Category Tabs Filter
  const newsTabBtns = document.querySelectorAll('.news-tab-btn');
  const newsCards = document.querySelectorAll('.news-grid-item');

  if (newsTabBtns.length && newsCards.length) {
    newsTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category') || 'all';
        newsTabBtns.forEach(b => b.classList.toggle('active', b === btn));

        newsCards.forEach(card => {
          const itemCat = card.getAttribute('data-category') || '';
          if (cat === 'all' || itemCat.includes(cat)) {
            card.style.display = '';
            card.classList.add('scroll-reveal', 'in-view');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Media Type Filter (Photos / Videos)
  const mediaTabBtns = document.querySelectorAll('.media-tab-btn');
  const mediaItems = document.querySelectorAll('.media-grid-item');

  if (mediaTabBtns.length && mediaItems.length) {
    mediaTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-filter') || 'all';
        mediaTabBtns.forEach(b => b.classList.toggle('active', b === btn));

        mediaItems.forEach(item => {
          const itemType = item.getAttribute('data-filter') || '';
          if (filterVal === 'all' || itemType.includes(filterVal)) {
            item.style.display = '';
            item.classList.add('scroll-reveal', 'in-view');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

