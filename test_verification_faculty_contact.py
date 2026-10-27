import sys
import os
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

def run_tests():
    console_errors = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe',
            headless=True
        )
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.on('console', lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == 'error' else None)
        page.on('pageerror', lambda exc: console_errors.append(f"[pageerror] {exc}"))

        print("==================================================")
        print("TEST 1: lien-he.html (3 Cards Row, Form, Map & Submit)")
        print("==================================================")
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/lien-he.html', wait_until='networkidle')
        page.wait_for_timeout(500)

        # 1. Verify 3 cards in campus-cards-row
        campus_cards = page.query_selector_all('.campus-cards-row .campus-detail-card')
        print(f"Cards in .campus-cards-row: {len(campus_cards)} (Expected: 3)")
        assert len(campus_cards) == 3, f"Expected 3 campus cards, got {len(campus_cards)}"

        # 2. Verify all 3 cards are horizontally aligned on desktop (same top offset +/- 5px)
        b_boxes = [c.bounding_box() for c in campus_cards]
        for i, box in enumerate(b_boxes):
            print(f"Card {i+1} bounding box: x={box['x']:.1f}, y={box['y']:.1f}, width={box['width']:.1f}, height={box['height']:.1f}")
        
        y_diff = abs(b_boxes[0]['y'] - b_boxes[1]['y']) + abs(b_boxes[1]['y'] - b_boxes[2]['y'])
        assert y_diff < 5, f"Cards are not in 1 row! y_diff={y_diff}"
        print("PASS: 3 cards are aligned in 1 horizontal row!")

        # 3. Verify form card is placed BELOW the 3 campus cards
        form_card = page.query_selector('.contact-form-card')
        assert form_card is not None, "contact-form-card not found!"
        form_box = form_card.bounding_box()
        max_card_bottom = max(b['y'] + b['height'] for b in b_boxes)
        print(f"Cards max bottom: {max_card_bottom:.1f}, Form top: {form_box['y']:.1f}")
        assert form_box['y'] >= max_card_bottom, "Form is not below the 3 cards row!"
        print("PASS: Form is properly placed below the 3 campus cards!")

        # 4. Verify form inputs are generous and not squished
        name_input = page.query_selector('#contactName')
        phone_input = page.query_selector('#contactPhone')
        email_input = page.query_selector('#contactEmail')
        name_box = name_input.bounding_box()
        phone_box = phone_input.bounding_box()
        email_box = email_input.bounding_box()
        print(f"Input widths: Name={name_box['width']:.1f}px, Phone={phone_box['width']:.1f}px, Email={email_box['width']:.1f}px")
        assert name_box['width'] > 300, f"Name input too narrow: {name_box['width']}px"
        assert phone_box['width'] > 300, f"Phone input too narrow: {phone_box['width']}px"
        assert email_box['width'] > 300, f"Email input too narrow: {email_box['width']}px"
        print("PASS: Form inputs have generous, unsquished widths!")

        # 5. Verify FAQ section is completely removed
        faq_section = page.query_selector('.curriculum-accordion')
        faq_headers = page.locator('text="Câu Hỏi Thường Gặp"').count()
        print(f"FAQ accordion found: {faq_section is not None}, FAQ header count: {faq_headers}")
        assert faq_section is None, "FAQ accordion was not removed!"
        assert faq_headers == 0, "FAQ title still exists!"
        print("PASS: FAQ section completely removed from lien-he.html!")

        # 6. Verify Google Maps switcher works smoothly
        map_iframe = page.query_selector('#googleMapIframe')
        initial_src = map_iframe.get_attribute('src')
        cs2_btn = page.query_selector('.map-tab-btn[data-campus="cs2"]')
        cs2_btn.click()
        page.wait_for_timeout(300)
        new_src = map_iframe.get_attribute('src')
        assert initial_src != new_src, "Map iframe src did not change when switching to CS2!"
        
        # Test card trigger
        cs1_trigger = page.query_selector('.trigger-map-campus[data-campus="cs1"]')
        cs1_trigger.click()
        page.wait_for_timeout(300)
        reverted_src = map_iframe.get_attribute('src')
        assert reverted_src == initial_src, "Map iframe did not revert to CS1 on card trigger click!"
        print("PASS: Google Map switcher and card triggers work smoothly!")

        # 7. Verify Form Submission & Feedback
        page.fill('#contactName', 'Nguyễn Thị Mai Linh')
        page.fill('#contactPhone', '0906716727')
        page.fill('#contactEmail', 'mailinh@example.com')
        page.select_option('#contactGrade', 'Lớp 9 (Luyện thi vào 10)')
        page.select_option('#contactCampus', 'CS1 - Số 01 Đường Số 6, Q.6')
        page.fill('#contactNotes', 'Cần tư vấn lớp Toán nâng cao cho con thi vào Chuyên.')
        page.click('#contactPageForm button[type="submit"]')
        page.wait_for_timeout(500)
        
        toast = page.query_selector('#toastNotice')
        toast_classes = toast.get_attribute('class') or ''
        toast_text = page.eval_on_selector('#toastMessage', 'el => el.textContent.trim()')
        print(f"Toast visible after submit: {'show' in toast_classes}, Message: '{toast_text}'")
        assert 'show' in toast_classes, "Toast notification did not appear on form submit!"
        print("PASS: Form submission triggers toast confirmation!")

        # 8. Save updated screenshots of lien-he.html
        os.makedirs(r'd:\SmartEdu\SmartEdu.DesignUI\27102026\screenshots', exist_ok=True)
        contact_sec = page.locator('#contactFormSection')
        contact_sec.scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        contact_sec.screenshot(path=r'd:\SmartEdu\SmartEdu.DesignUI\27102026\screenshots\lien-he-updated.png')
        print("Saved screenshot: screenshots/lien-he-updated.png")

        print("\n==================================================")
        print("TEST 2: index.html (Faculty Showcase, Arrows & All 4 Modals)")
        print("==================================================")
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/index.html', wait_until='networkidle')
        page.wait_for_timeout(500)

        # 1. Verify exactly 4 featured faculty cards on homepage
        faculty_cards = page.query_selector_all('.faculty-scroll-track .faculty-card')
        print(f"Faculty cards in track: {len(faculty_cards)} (Expected: 4)")
        assert len(faculty_cards) == 4, f"Expected 4 faculty cards, got {len(faculty_cards)}"

        # 2. Verify all 4 are in 1 row (same y offset)
        f_boxes = [c.bounding_box() for c in faculty_cards]
        for i, box in enumerate(f_boxes):
            print(f"Teacher {i+1} bounding box: x={box['x']:.1f}, y={box['y']:.1f}, width={box['width']:.1f}, height={box['height']:.1f}")
        
        y_diff_f = max(b['y'] for b in f_boxes) - min(b['y'] for b in f_boxes)
        assert y_diff_f < 5, f"Faculty cards not in 1 row! y_diff={y_diff_f}"
        print("PASS: 4 faculty cards are in 1 single horizontal row!")

        # 3. Verify horizontal scroll track properties
        track_scroll_w = page.eval_on_selector('#facultyScrollTrack', 'el => el.scrollWidth')
        track_client_w = page.eval_on_selector('#facultyScrollTrack', 'el => el.clientWidth')
        print(f"Track scrollWidth={track_scroll_w}px, clientWidth={track_client_w}px, scrollable={track_scroll_w > track_client_w}")
        assert track_scroll_w > track_client_w, f"Faculty track should be horizontally scrollable! {track_scroll_w} <= {track_client_w}"
        print("PASS: Faculty track configured for horizontal scrolling!")

        # 4. Verify Arrow controls & dynamic disabled states
        prev_btn = page.query_selector('#facultyScrollPrev')
        next_btn = page.query_selector('#facultyScrollNext')
        
        # At start, scrollLeft should be 0 and prev_btn disabled
        page.eval_on_selector('#facultyScrollTrack', 'el => el.scrollLeft = 0')
        page.wait_for_timeout(200)
        
        prev_disabled_start = prev_btn.is_disabled()
        print(f"Prev arrow disabled at scroll start: {prev_disabled_start}")
        assert prev_disabled_start, "Prev arrow must be disabled at start of track!"
        
        # Click next arrow
        next_btn.click()
        page.wait_for_timeout(500)
        scroll_after_next = page.eval_on_selector('#facultyScrollTrack', 'el => el.scrollLeft')
        print(f"Track scrollLeft after Next arrow click: {scroll_after_next}px")
        assert scroll_after_next > 0, "Next arrow did not scroll track!"
        
        prev_disabled_after_next = prev_btn.is_disabled()
        print(f"Prev arrow disabled after scrolling: {prev_disabled_after_next}")
        assert not prev_disabled_after_next, "Prev arrow must be enabled after scrolling right!"
        
        # Click prev arrow
        prev_btn.click()
        page.wait_for_timeout(500)
        scroll_after_prev = page.eval_on_selector('#facultyScrollTrack', 'el => el.scrollLeft')
        print(f"Track scrollLeft after Prev arrow click: {scroll_after_prev}px")
        assert scroll_after_prev <= 10, "Prev arrow did not scroll track back to start!"
        print("PASS: Arrow controls navigate track and update disabled states flawlessly!")

        # 5. Verify mouse drag functionality on track
        track_box = page.locator('#facultyScrollTrack').bounding_box()
        start_x = track_box['x'] + track_box['width'] - 50
        drag_y = track_box['y'] + track_box['height'] / 2
        
        page.mouse.move(start_x, drag_y)
        page.mouse.down()
        page.mouse.move(start_x - 120, drag_y, steps=10)
        page.mouse.up()
        page.wait_for_timeout(300)
        
        drag_scroll = page.eval_on_selector('#facultyScrollTrack', 'el => el.scrollLeft')
        print(f"Track scrollLeft after mouse drag: {drag_scroll}px")
        assert drag_scroll > 0, "Mouse drag failed to scroll track!"
        print("PASS: Desktop mouse drag scrolling functions properly!")
        
        # Reset scroll to 0 for modal tests
        page.eval_on_selector('#facultyScrollTrack', 'el => el.scrollLeft = 0')
        page.wait_for_timeout(200)

        # 6. Verify teacher bio modal for ALL 4 TEACHERS
        expected_names = [
            "ThS. Nguyễn Thanh Tùng",
            "ThS. Lê Thu Thảo",
            "ThS. Hoàng Minh Đức",
            "ThS. Trần Quốc Bảo"
        ]
        
        for idx in range(1, 5):
            bio_btn = page.query_selector(f'.faculty-card a.faculty-btn-bio[data-id="{idx}"]')
            assert bio_btn is not None, f"Bio button for teacher {idx} missing!"
            bio_btn.click()
            page.wait_for_timeout(300)
            modal = page.query_selector('#facultyModal')
            assert modal.is_visible(), f"Faculty modal not visible for teacher {idx}!"
            name = page.eval_on_selector('#modalFacultyName', 'el => el.textContent.trim()')
            print(f"Teacher {idx} Modal Name: '{name}' (Expected: '{expected_names[idx-1]}')")
            assert name == expected_names[idx-1], f"Modal name mismatch: {name} != {expected_names[idx-1]}"
            page.keyboard.press('Escape')
            page.wait_for_timeout(300)
            assert not modal.is_visible(), f"Faculty modal did not close for teacher {idx}!"
            
        print("PASS: All 4 teacher bio modals display accurate data and close properly!")

        # 7. Verify CTA button to ban-giang-huan.html
        cta_btn = page.query_selector('#section-faculty a[href="ban-giang-huan.html"]')
        cta_text = cta_btn.text_content().strip() if cta_btn else ""
        print(f"CTA Button Text: '{cta_text}'")
        assert "14+" in cta_text or "Giảng sư tinh hoa" in cta_text, f"CTA button text mismatch: {cta_text}"
        print("PASS: CTA button correctly links to ban-giang-huan.html with 14+ faculty label!")

        # 8. Take element screenshot of index.html faculty section
        fac_sec = page.locator('#section-faculty')
        fac_sec.scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        fac_sec.screenshot(path=r'd:\SmartEdu\SmartEdu.DesignUI\27102026\screenshots\index-faculty-updated.png')
        print("Saved screenshot: screenshots/index-faculty-updated.png")

        print("\n==================================================")
        print("TEST 3: Zero Horizontal Body Overflow (1440, 1024, 768, 375)")
        print("==================================================")
        pages_to_check = ['lien-he.html', 'index.html']
        viewports = [1440, 1024, 768, 375]
        for vp in viewports:
            page.set_viewport_size({'width': vp, 'height': 800})
            for p_name in pages_to_check:
                page.goto(f'file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/{p_name}', wait_until='networkidle')
                page.wait_for_timeout(150)
                scroll_w = page.evaluate('() => document.documentElement.scrollWidth')
                inner_w = page.evaluate('() => window.innerWidth')
                print(f"[{p_name} @ {vp}px] scrollWidth={scroll_w}, innerWidth={inner_w}")
                assert scroll_w <= inner_w, f"Overflow on {p_name} at {vp}px: {scroll_w} > {inner_w}"

        print("PASS: Zero horizontal page overflow detected across all responsive viewports!")
        
        # Save mobile screenshots
        page.set_viewport_size({'width': 375, 'height': 812})
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/lien-he.html', wait_until='networkidle')
        page.wait_for_timeout(200)
        page.locator('#contactFormSection').scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.screenshot(path=r'd:\SmartEdu\SmartEdu.DesignUI\27102026\screenshots\lien-he-mobile-375.png')
        
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/index.html', wait_until='networkidle')
        page.wait_for_timeout(200)
        page.locator('#section-faculty').scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        page.screenshot(path=r'd:\SmartEdu\SmartEdu.DesignUI\27102026\screenshots\index-faculty-mobile-375.png')
        print("Saved mobile screenshots for both pages!")

        print(f"\nTotal Console Errors: {len(console_errors)}")
        assert len(console_errors) == 0, f"Found console errors: {console_errors}"

        print("\n==================================================")
        print("ALL VERIFICATION TESTS COMPLETED WITH 100% SUCCESS!")
        print("==================================================")
        browser.close()

if __name__ == '__main__':
    run_tests()
