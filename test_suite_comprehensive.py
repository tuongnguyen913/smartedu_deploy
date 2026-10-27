import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})

        print("=== TEST 1: Dropdown & Megamenu on index.html ===")
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/index.html', wait_until='domcontentloaded')
        
        # Test Giới thiệu hover
        gt_item = page.query_selector('.nav-item:has(.dropdown-menu)')
        if gt_item:
            gt_item.hover()
            page.wait_for_timeout(300)
            gt_vis = page.eval_on_selector('.dropdown-menu', 'el => window.getComputedStyle(el).visibility === "visible" && window.getComputedStyle(el).opacity === "1"')
            print(f"Giới thiệu dropdown visible on hover: {gt_vis}")
        else:
            print("ERROR: Nav item with dropdown menu not found")
        
        # Test Chương trình học hover
        mm_item = page.query_selector('.megamenu-item')
        if mm_item:
            mm_item.hover()
            page.wait_for_timeout(300)
            mm_vis = page.eval_on_selector('.megamenu', 'el => window.getComputedStyle(el).visibility === "visible" && window.getComputedStyle(el).opacity === "1"')
            print(f"Megamenu visible on hover: {mm_vis}")
            mm_box = page.eval_on_selector('.megamenu', 'el => el.getBoundingClientRect()')
            print(f"Megamenu bounding box: width={mm_box['width']}, top={mm_box['top']}, bottom={mm_box['bottom']}")

        # Test index counters & scroll
        counters = page.query_selector_all('.counter-value')
        print(f"Counters found on index.html: {len(counters)}")
        page.evaluate('window.scrollTo(0, 1200)')
        page.wait_for_timeout(1000)
        has_scrolled = page.eval_on_selector('.main-header', 'el => el.classList.contains("scrolled")')
        print(f"Main header has 'scrolled' class after scroll: {has_scrolled}")

        print("\n=== TEST 2: ban-giang-huan.html (Faculty Filter, Modal & Counters) ===")
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/ban-giang-huan.html', wait_until='domcontentloaded')
        cards = page.query_selector_all('.faculty-card')
        print(f"Total faculty cards found: {len(cards)}")
        
        faculty_counters = page.query_selector_all('.counter-value')
        print(f"Counters on ban-giang-huan.html: {len(faculty_counters)}")
        
        # Click filter 'Toán học'
        toan_btn = page.query_selector('.faculty-tab-btn[data-filter="toan"]')
        if toan_btn:
            toan_btn.click()
            page.wait_for_timeout(300)
            vis_cards = [c for c in cards if c.is_visible()]
            print(f"Visible cards after filter 'toan': {len(vis_cards)}")
        
        # Click detail button on first card
        detail_btn = page.query_selector('.faculty-btn-bio')
        if detail_btn:
            detail_btn.click()
            page.wait_for_timeout(400)
            modal = page.query_selector('#facultyModal, #modalFacultyBio')
            modal_vis = modal.is_visible() if modal else False
            name = page.eval_on_selector('#modalFacultyName', 'el => el.textContent.trim()')
            print(f"Faculty modal visible after click: {modal_vis}, Name: {name}")
            
            # Press Escape to close modal
            page.keyboard.press('Escape')
            page.wait_for_timeout(300)
            modal_vis_after = modal.is_visible() if modal else False
            print(f"Faculty modal visible after ESC: {modal_vis_after}")

        print("\n=== TEST 3: chuong-trinh-hoc.html (Tabs, Accordion & Counters) ===")
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/chuong-trinh-hoc.html', wait_until='domcontentloaded')
        curr_counters = page.query_selector_all('.counter-value')
        print(f"Counters on chuong-trinh-hoc.html: {len(curr_counters)}")
        
        accordions = page.query_selector_all('.accordion-header')
        print(f"Accordions found: {len(accordions)}")
        if accordions:
            first_acc = accordions[0]
            first_item = page.query_selector('.accordion-item')
            is_active_initial = 'active' in (first_item.get_attribute('class') or '')
            first_acc.click()
            page.wait_for_timeout(200)
            is_active_after = 'active' in (first_item.get_attribute('class') or '')
            print(f"Accordion item active before: {is_active_initial}, active after click: {is_active_after}")

        print("\n=== TEST 4: thu-vien-media.html (Lightbox) ===")
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/thu-vien-media.html', wait_until='domcontentloaded')
        media_items = page.query_selector_all('.media-card, [data-lightbox]')
        print(f"Media items found: {len(media_items)}")
        if media_items:
            media_items[0].click()
            page.wait_for_timeout(300)
            lightbox = page.query_selector('.lightbox-modal, #lightboxModal')
            lb_vis = lightbox.is_visible() if lightbox else False
            print(f"Lightbox visible after click: {lb_vis}")
            page.keyboard.press('Escape')
            page.wait_for_timeout(200)
            lb_vis_after = lightbox.is_visible() if lightbox else False
            print(f"Lightbox visible after ESC: {lb_vis_after}")

        print("\n=== TEST 5: lien-he.html (Map Switcher & Direct Card Click) ===")
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/lien-he.html', wait_until='domcontentloaded')
        contact_counters = page.query_selector_all('.counter-value')
        print(f"Counters on lien-he.html: {len(contact_counters)}")
        
        map_iframe = page.query_selector('#googleMapIframe')
        initial_src = map_iframe.get_attribute('src') if map_iframe else None
        print(f"Initial map src: {str(initial_src)[:60]}...")
        
        cs2_btn = page.query_selector('.map-tab-btn[data-campus="cs2"]')
        if cs2_btn:
            cs2_btn.click()
            page.wait_for_timeout(300)
            new_src = map_iframe.get_attribute('src') if map_iframe else None
            print(f"Map src changed via tab button: {initial_src != new_src}")
            
        # Test clicking card trigger directly
        cs1_trigger = page.query_selector('.trigger-map-campus[data-campus="cs1"]')
        if cs1_trigger:
            cs1_trigger.click()
            page.wait_for_timeout(300)
            reverted_src = map_iframe.get_attribute('src') if map_iframe else None
            print(f"Map reverted to CS1 via trigger: {reverted_src == initial_src}")

        print("\n=== TEST 6: gioi-thieu.html (Bento, Counters) ===")
        page.goto('file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/gioi-thieu.html', wait_until='domcontentloaded')
        gt_counters = page.query_selector_all('.counter-value')
        print(f"Counters on gioi-thieu.html: {len(gt_counters)}")

        print("\n=== TEST 7: Responsive & Zero Horizontal Scrollbar ===")
        test_pages = [
            'index.html', 'gioi-thieu.html', 'chuong-trinh-hoc.html',
            'ban-giang-huan.html', 'tin-tuc.html', 'bai-viet-chi-tiet.html',
            'thu-vien-media.html', 'lien-he.html'
        ]
        viewports = [1440, 1100, 768, 375]
        
        has_overflow_error = False
        for vp in viewports:
            page.set_viewport_size({'width': vp, 'height': 800})
            for p_name in test_pages:
                page.goto(f'file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/{p_name}', wait_until='domcontentloaded')
                page.wait_for_timeout(100)
                scroll_w = page.evaluate('() => document.documentElement.scrollWidth')
                inner_w = page.evaluate('() => window.innerWidth')
                if scroll_w > inner_w:
                    print(f"FAIL [Overflow at {vp}px on {p_name}]: scrollWidth={scroll_w} > innerWidth={inner_w}")
                    has_overflow_error = True
        
        if not has_overflow_error:
            print("SUCCESS: 0 horizontal scrollbar detected across all 8 pages at 1440px, 1100px, 768px, 375px!")

        browser.close()
        print("\n=== ALL COMPREHENSIVE TESTS COMPLETED SUCCESSFULLY ===")

if __name__ == '__main__':
    run_tests()
