import os
import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

base_dir = r"d:\27102026"
output_dir = os.path.join(base_dir, "screenshots")
os.makedirs(output_dir, exist_ok=True)

pages = [
    {
        "id": "01_Trang_Chu",
        "file": "index.html",
        "title": "Trang Chủ - SmartEdu Academy"
    },
    {
        "id": "02_Gioi_Thieu",
        "file": "gioi-thieu.html",
        "title": "Giới Thiệu & Hệ Giá Trị Cốt Lõi"
    },
    {
        "id": "03_Chuong_Trinh_Hoc",
        "file": "chuong-trinh-hoc.html",
        "title": "Chương Trình Đào Tạo K-12"
    },
    {
        "id": "04_Ban_Giang_Huan",
        "file": "ban-giang-huan.html",
        "title": "Hội Đồng Ban Giảng Huấn (14 Giảng Sư)"
    },
    {
        "id": "05_Tin_Tuc",
        "file": "tin-tuc.html",
        "title": "Tin Tức & Cẩm Nang Phụ Huynh"
    },
    {
        "id": "06_Bai_Viet_Chi_Tiet",
        "file": "bai-viet-chi-tiet.html",
        "title": "Bài Viết Chi Tiết (Reading Mode)"
    },
    {
        "id": "07_Thu_Vien_Media",
        "file": "thu-vien-media.html",
        "title": "Thư Viện Đa Phương Tiện & Video"
    },
    {
        "id": "08_Lien_He",
        "file": "lien-he.html",
        "title": "Liên Hệ & Hệ Thống 2 Cơ Sở Bình Phú"
    }
]

def capture_all():
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    
    with sync_playwright() as p:
        print("Starting Chrome in Headless mode with device_scale_factor=2 (Crystal Clear HQ)...")
        browser = p.chromium.launch(
            executable_path=chrome_path,
            headless=True,
            args=["--disable-web-security", "--allow-file-access-from-files"]
        )

        # 1. Desktop 1440px with 2x Retina Scale (2880px wide render)
        context_desktop = browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )

        # 2. Mobile 375px with 2x Scale (750px wide render)
        context_mobile = browser.new_context(
            viewport={"width": 375, "height": 812},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )

        for item in pages:
            file_url = f"file:///{os.path.join(base_dir, item['file']).replace('\\', '/')}"
            print(f"\n==================================================")
            print(f"Capturing: {item['title']} ({item['file']})")
            print(f"==================================================")

            # --- DESKTOP FULL PAGE ---
            page_d = context_desktop.new_page()
            page_d.goto(file_url, wait_until="networkidle")
            time.sleep(0.5)

            # Ensure all animated/scroll-reveal elements are fully visible and counters set
            page_d.evaluate("""() => {
                // Force reveal all scroll elements
                document.querySelectorAll('.scroll-reveal').forEach(el => {
                    el.classList.add('revealed');
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                    el.style.transition = 'none';
                });
                // Force counter values to final target
                document.querySelectorAll('.counter-value').forEach(el => {
                    const target = el.getAttribute('data-target');
                    if (target) el.textContent = target;
                });
                // Disable sticky floating pill jitter during screenshot if needed
            }""")
            time.sleep(0.5)

            desktop_png = os.path.join(output_dir, f"{item['id']}_Desktop_HQ.png")
            page_d.screenshot(path=desktop_png, full_page=True, type="png")
            size_mb = os.path.getsize(desktop_png) / (1024 * 1024)
            print(f"  [✓] Desktop HQ: {os.path.basename(desktop_png)} ({size_mb:.2f} MB)")
            page_d.close()

            # --- MOBILE FULL PAGE ---
            page_m = context_mobile.new_page()
            page_m.goto(file_url, wait_until="networkidle")
            time.sleep(0.5)

            page_m.evaluate("""() => {
                document.querySelectorAll('.scroll-reveal').forEach(el => {
                    el.classList.add('revealed');
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                    el.style.transition = 'none';
                });
                document.querySelectorAll('.counter-value').forEach(el => {
                    const target = el.getAttribute('data-target');
                    if (target) el.textContent = target;
                });
            }""")
            time.sleep(0.5)

            mobile_png = os.path.join(output_dir, f"{item['id']}_Mobile_HQ.png")
            page_m.screenshot(path=mobile_png, full_page=True, type="png")
            size_mb_m = os.path.getsize(mobile_png) / (1024 * 1024)
            print(f"  [✓] Mobile HQ:  {os.path.basename(mobile_png)} ({size_mb_m:.2f} MB)")
            page_m.close()

        browser.close()
        print("\nAll 8 pages captured in High-Quality PNG successfully!")

if __name__ == "__main__":
    capture_all()


