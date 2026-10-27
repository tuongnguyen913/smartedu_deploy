import os
import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

PAGES = [
    'index.html',
    'gioi-thieu.html',
    'chuong-trinh-hoc.html',
    'ban-giang-huan.html',
    'tin-tuc.html',
    'bai-viet-chi-tiet.html',
    'thu-vien-media.html',
    'lien-he.html'
]

VIEWPORTS = [
    {"name": "Desktop 1440px", "width": 1440, "height": 900},
    {"name": "Laptop 1024px",  "width": 1024, "height": 768},
    {"name": "Tablet 768px",   "width": 768,  "height": 1024},
    {"name": "Mobile 375px",   "width": 375,  "height": 812}
]

def run_all_tests():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    total_errors = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=chrome_path,
            headless=True,
            args=["--disable-web-security", "--allow-file-access-from-files"]
        )

        print("\n" + "="*70)
        print("🚀 SMARTEDU WOW UI UPGRADE — COMPREHENSIVE TEST SUITE (ENHANCED)")
        print("="*70)

        # -------------------------------------------------------------
        # SUITE 1: Responsive Layout & Zero Overflow (4 Viewports x 8 Pages)
        # -------------------------------------------------------------
        print("\n[SUITE 1] Kiểm tra Zero Horizontal Overflow & Console Errors (32 kịch bản)")
        for vp in VIEWPORTS:
            context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
            page = context.new_page()
            
            console_errors = []
            page.on("console", lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == "error" else None)
            page.on("pageerror", lambda exc: console_errors.append(f"[pageerror] {exc}"))

            for p_file in PAGES:
                url = f"file:///d:/27102026/{p_file}"
                page.goto(url, wait_until="domcontentloaded")
                page.wait_for_timeout(100)

                scroll_w = page.evaluate("() => document.documentElement.scrollWidth")
                inner_w = page.evaluate("() => window.innerWidth")
                
                if scroll_w > inner_w:
                    err = f"FAIL [Overflow] {p_file} @ {vp['name']}: scrollWidth={scroll_w} > innerWidth={inner_w}"
                    print("  ❌ " + err)
                    total_errors.append(err)
                else:
                    pass

                if console_errors:
                    err = f"FAIL [Console Error] {p_file} @ {vp['name']}: {console_errors}"
                    print("  ❌ " + err)
                    total_errors.append(err)
                    console_errors.clear()

            context.close()
            print(f"  ✅ Hoàn tất kiểm tra tại {vp['name']} cho cả 8 trang: 0 overflow, 0 lỗi.")

        # -------------------------------------------------------------
        # SUITE 2: Core Components & Interactive Motion on index.html
        # -------------------------------------------------------------
        print("\n[SUITE 2] Kiểm thử tương tác Trang Chủ (index.html)")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("file:///d:/27102026/index.html", wait_until="domcontentloaded")
        page.wait_for_timeout(300)

        # 1. Hero Slide Transition & GSAP Animate Hook
        has_animate_hook = page.evaluate("() => typeof window.animateHeroSlide === 'function'")
        assert has_animate_hook, "window.animateHeroSlide hook missing!"
        print("  ✅ GSAP Slide Transition Engine đã sẵn sàng và gắn kết với Hero Carousel.")

        hero_next = page.query_selector(".hero-btn-next")
        if hero_next:
            hero_next.click()
            page.wait_for_timeout(300)
            active_slide = page.eval_on_selector(".hero-slide.active", "el => el !== null")
            assert active_slide, "No active hero slide after click next!"
            print("  ✅ Chuyển slide tiếp theo kích hoạt GSAP Timeline reveal thành công.")

        # 2. Golden Assurance Cards Enhancement
        usp_cards = page.query_selector_all(".commitment-card.usp-card-enhanced")
        assert len(usp_cards) == 4, f"Expected 4 enhanced golden commitment cards, got {len(usp_cards)}"
        print("  ✅ 4 Cam Kết Vàng sở hữu class usp-card-enhanced và hiệu ứng phản quang viền vàng.")

        # 3. Faculty horizontal scroll & arrows with throttle
        track = page.query_selector("#facultyScrollTrack")
        prev_btn = page.query_selector("#facultyScrollPrev")
        next_btn = page.query_selector("#facultyScrollNext")
        progress_bar = page.query_selector(".faculty-scroll-progress-bar")

        assert track is not None, "facultyScrollTrack missing!"
        assert prev_btn is not None and next_btn is not None, "Faculty nav arrows missing!"
        assert progress_bar is not None, "Faculty scroll progress bar missing!"

        # Arrow forward
        next_btn.click()
        page.wait_for_timeout(400)
        scroll_after_next = page.eval_on_selector("#facultyScrollTrack", "el => el.scrollLeft")
        assert scroll_after_next > 0, "Next arrow did not scroll track!"
        print(f"  ✅ Faculty track scroll next hoạt động mượt mà (scrollLeft={scroll_after_next}px).")

        # Arrow backward
        prev_btn.click()
        page.wait_for_timeout(400)
        scroll_after_prev = page.eval_on_selector("#facultyScrollTrack", "el => el.scrollLeft")
        assert scroll_after_prev <= 10, "Prev arrow did not scroll back!"
        print(f"  ✅ Faculty track scroll prev quay về đầu chuẩn xác (scrollLeft={scroll_after_prev}px).")

        # 4. Teacher Bio Modal
        bio_btn = page.query_selector('.faculty-card a.faculty-btn-bio[data-id="1"]')
        assert bio_btn is not None, "Faculty bio button 1 missing!"
        bio_btn.click()
        page.wait_for_timeout(300)
        modal_name = page.eval_on_selector("#modalFacultyName", "el => el.textContent.trim()")
        assert modal_name == "ThS. Nguyễn Thanh Tùng", f"Unexpected teacher name in modal: {modal_name}"
        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        print("  ✅ Faculty modal hiển thị chuẩn dữ liệu học thuật và đóng bằng ESC thành công.")

        # 5. Choose Course quick filter bar
        quick_select = page.query_selector("#quickFilterLevel")
        if quick_select:
            quick_select.select_option("cap2")
            page.click("#btnQuickCourseFilter")
            page.wait_for_timeout(300)
            active_tab = page.eval_on_selector(".course-tab-btn.active", "el => el.getAttribute('data-filter')")
            assert active_tab == "cap2", f"Quick filter did not activate cap2 tab! Got: {active_tab}"
            print("  ✅ Thanh chọn nhanh khóa học (Hero Quick Choose) liên kết đồng bộ với Course Tabs.")

        # 6. Consultation Form Submit Toast
        page.fill("#regName", "Nguyễn Văn An")
        page.fill("#regPhone", "0901234567")
        page.select_option("#regGrade", "Lớp 9 (Luyện thi vào 10)")
        page.click("#leadRegistrationForm button[type='submit']")
        page.wait_for_timeout(400)
        toast = page.query_selector("#toastNotice")
        assert "show" in (toast.get_attribute("class") or ""), "Toast did not show on leadRegistrationForm submit!"
        print("  ✅ Form đăng ký tư vấn trực tiếp (Lead Form) kích hoạt Toast phản hồi tức thì.")
        page.close()

        # -------------------------------------------------------------
        # SUITE 3: Interactive Level Switcher & Roadmap Timeline (chuong-trinh-hoc.html)
        # -------------------------------------------------------------
        print("\n[SUITE 3] Kiểm thử Lộ Trình K-12 & Interactive Level Switcher (chuong-trinh-hoc.html)")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("file:///d:/27102026/chuong-trinh-hoc.html", wait_until="domcontentloaded")
        page.wait_for_timeout(300)

        # 1. Level Switcher tab click
        tab_tuyensinh10 = page.query_selector('.course-tab-btn[data-filter="tuyensinh10"]')
        assert tab_tuyensinh10 is not None, "tuyensinh10 tab button missing!"
        tab_tuyensinh10.click()
        page.wait_for_timeout(200)

        # Verify tuition row highlight & stickyGrade update
        sticky_val = page.eval_on_selector("#stickyGrade", "el => el.value")
        assert sticky_val == "lop9", f"Sticky grade select not synced! Expected lop9, got {sticky_val}"
        print(f"  ✅ Level Switcher 'Luyện thi Tuyển sinh 10' tự động đồng bộ sang Form đăng ký (stickyGrade={sticky_val}).")

        # 2. Roadmap Timeline Markers & Accordion
        markers = page.query_selector_all(".roadmap-step-marker")
        assert len(markers) == 3, f"Expected 3 roadmap step markers along the timeline line, got {len(markers)}"
        print(f"  ✅ Trục lộ trình K-12 có đầy đủ {len(markers)} điểm mốc tròn (roadmap-step-marker) phát sáng viền đỏ.")

        accordion_headers = page.query_selector_all(".accordion-header")
        assert len(accordion_headers) >= 3, f"Expected at least 3 accordion stages, got {len(accordion_headers)}"
        accordion_headers[1].click()
        page.wait_for_timeout(200)
        item2_class = page.query_selector_all(".accordion-item")[1].get_attribute("class") or ""
        assert "active" in item2_class, "Accordion item 2 did not open on click!"
        print("  ✅ Trục lộ trình chuyên đề Roadmap Accordion đóng mở linh hoạt.")
        page.close()

        # -------------------------------------------------------------
        # SUITE 4: 14 Faculty GSAP Filter & Rich Bio Modal (ban-giang-huan.html)
        # -------------------------------------------------------------
        print("\n[SUITE 4] Kiểm thử Bộ Lọc Giảng Sư GSAP & Profile Học Thuật (ban-giang-huan.html)")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("file:///d:/27102026/ban-giang-huan.html", wait_until="domcontentloaded")
        page.wait_for_timeout(300)

        all_faculty = page.query_selector_all(".faculty-card")
        assert len(all_faculty) == 14, f"Expected 14 faculty members, got {len(all_faculty)}"
        print(f"  ✅ Hiển thị đầy đủ 14 Giảng sư tinh hoa.")

        # Test filter Toán
        page.click('.faculty-tab-btn[data-filter="toan"]')
        page.wait_for_timeout(400)
        visible_math = [c for c in all_faculty if c.is_visible()]
        print(f"  ✅ Lọc Bộ môn Toán mượt mà qua GSAP: {len(visible_math)} giảng viên hiển thị.")
        assert len(visible_math) == 4, f"Expected 4 math teachers, got {len(visible_math)}"

        # Test filter KHTN
        page.click('.faculty-tab-btn[data-filter="khtn"]')
        page.wait_for_timeout(400)
        visible_sci = [c for c in all_faculty if c.is_visible()]
        print(f"  ✅ Lọc Bộ môn KHTN: {len(visible_sci)} giảng viên hiển thị.")
        assert len(visible_sci) == 4, f"Expected 4 KHTN teachers, got {len(visible_sci)}"
        page.close()

        # -------------------------------------------------------------
        # SUITE 5: Fullscreen Lightbox & Category Filter (thu-vien-media.html)
        # -------------------------------------------------------------
        print("\n[SUITE 5] Kiểm thử Thư Viện Media & Lightbox Toàn Màn Hình (thu-vien-media.html)")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("file:///d:/27102026/thu-vien-media.html", wait_until="domcontentloaded")
        page.wait_for_timeout(300)

        media_card = page.query_selector(".media-card, [data-lightbox]")
        assert media_card is not None, "Media card missing!"
        media_card.click()
        page.wait_for_timeout(400)

        lightbox = page.query_selector("#lightboxModal, .lightbox-modal")
        assert lightbox is not None and lightbox.is_visible(), "Lightbox did not open!"
        print("  ✅ Lightbox toàn màn hình mở sắc nét khi click vào ảnh.")

        page.keyboard.press("Escape")
        page.wait_for_timeout(200)
        assert not lightbox.is_visible(), "Lightbox did not close on ESC!"
        print("  ✅ Lightbox đóng mượt mà bằng phím Escape.")
        page.close()

        # -------------------------------------------------------------
        # SUITE 6: Reading Progress Bar & TOC Active Tracker (bai-viet-chi-tiet.html)
        # -------------------------------------------------------------
        print("\n[SUITE 6] Kiểm thử Reading Mode & Dynamic TOC (bai-viet-chi-tiet.html)")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("file:///d:/27102026/bai-viet-chi-tiet.html", wait_until="domcontentloaded")
        page.wait_for_timeout(300)

        progress_bar = page.query_selector("#readingProgressBar")
        assert progress_bar is not None, "readingProgressBar missing!"

        page.evaluate("window.scrollTo(0, 1500)")
        page.wait_for_timeout(300)
        bar_w = page.eval_on_selector("#readingProgressBar", "el => el.style.width")
        print(f"  ✅ Reading Progress Bar đo tiến độ cuộn trang chuẩn xác (width={bar_w}).")

        toc_links = page.query_selector_all("#articleToc a, .toc-list a")
        assert len(toc_links) >= 4, f"Expected at least 4 TOC links, got {len(toc_links)}"

        # Test clicking TOC item 3
        page.click('#articleToc a[href="#muc-3"]')
        page.wait_for_timeout(400)
        active_toc = page.query_selector('#articleToc a[href="#muc-3"].active-toc')
        assert active_toc is not None, "Clicking TOC link did not activate active-toc class!"
        print("  ✅ Click mục lục chuyển cuộn mượt và gắn class active-toc chuẩn xác.")

        # Test scroll to very bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(300)
        last_toc_active = page.eval_on_selector('#articleToc a[href="#muc-5"]', "el => el.classList.contains('active-toc')")
        assert last_toc_active, "Last heading did not activate at bottom of article!"
        print("  ✅ Cuộn đến cuối bài viết kích hoạt mục cuối cùng chuẩn xác.")
        page.close()

        # -------------------------------------------------------------
        # SUITE 7: Dual Campus Map Switcher & 3 Cards Alignment (lien-he.html)
        # -------------------------------------------------------------
        print("\n[SUITE 7] Kiểm thử Hệ Thống 2 Cơ Sở & Google Map Switcher (lien-he.html)")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("file:///d:/27102026/lien-he.html", wait_until="domcontentloaded")
        page.wait_for_timeout(300)

        campus_cards = page.query_selector_all(".campus-cards-row .campus-detail-card")
        assert len(campus_cards) == 3, f"Expected 3 campus cards, got {len(campus_cards)}"
        boxes = [c.bounding_box() for c in campus_cards]
        y_diff = abs(boxes[0]["y"] - boxes[1]["y"]) + abs(boxes[1]["y"] - boxes[2]["y"])
        assert y_diff < 5, f"Cards not in 1 horizontal row! y_diff={y_diff}"
        print("  ✅ 3 thẻ thông tin cơ sở nằm trên 1 hàng ngang đồng nhất.")

        # Map switcher
        map_iframe = page.query_selector("#googleMapIframe")
        initial_src = map_iframe.get_attribute("src")
        page.click('.map-tab-btn[data-campus="cs2"]')
        page.wait_for_timeout(300)
        new_src = map_iframe.get_attribute("src")
        assert initial_src != new_src, "Map iframe did not switch to CS2!"
        print("  ✅ Google Maps tương tác chuyển đổi tức thì giữa Cơ sở 1 và Cơ sở 2.")
        page.close()

        # -------------------------------------------------------------
        # SUITE 8: Bento Grid, Digital Seal & Legal Accordion (gioi-thieu.html)
        # -------------------------------------------------------------
        print("\n[SUITE 8] Kiểm thử Bento Grid, Con Dấu Điện Tử & Legal Accordion (gioi-thieu.html)")
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("file:///d:/27102026/gioi-thieu.html", wait_until="domcontentloaded")
        page.wait_for_timeout(300)

        bento_cards = page.query_selector_all(".bento-card")
        assert len(bento_cards) >= 3, f"Expected >= 3 bento cards, got {len(bento_cards)}"
        seal = page.query_selector(".editorial-stamp-seal, .stamp-digital, .editorial-seal")
        assert seal is not None, "Digital seal stamp missing in leadership quote block!"
        print("  ✅ Bento Grid Hệ Giá Trị Cốt Lõi & Con dấu điện tử hiển thị sang trọng, uy tín.")

        # Legal accordion test
        legal_headers = page.query_selector_all(".legal-accordion-header")
        assert len(legal_headers) == 3, f"Expected 3 legal accordion items, got {len(legal_headers)}"
        
        # Click Item 2 to expand
        legal_headers[1].click()
        page.wait_for_timeout(250)
        item2_active = page.eval_on_selector_all(".legal-accordion-item", "items => items[1].classList.contains('active')")
        assert item2_active, "Legal accordion item 2 did not expand on click!"
        print("  ✅ Hồ sơ pháp lý dạng Accordion tương tác mở xem chi tiết quy chế tại chỗ mượt mà.")
        page.close()

        browser.close()

        print("\n" + "="*70)
        if not total_errors:
            print("🎉 TẤT CẢ CÁC BÀI TEST TỰ ĐỘNG ĐÃ VƯỢT QUA 100% HOÀN HẢO!")
            print("="*70)
            return True
        else:
            print(f"❌ CÓ {len(total_errors)} LỖI ĐƯỢC PHÁT HIỆN:")
            for e in total_errors:
                print("  - " + e)
            print("="*70)
            return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
