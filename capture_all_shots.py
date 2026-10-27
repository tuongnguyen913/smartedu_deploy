import sys
sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

pages = [
    'index.html',
    'gioi-thieu.html',
    'chuong-trinh-hoc.html',
    'ban-giang-huan.html',
    'tin-tuc.html',
    'bai-viet-chi-tiet.html',
    'thu-vien-media.html',
    'lien-he.html'
]

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    for pg in pages:
        name = pg.split('.')[0]
        # Desktop
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        page.goto(f'file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/{pg}', wait_until='domcontentloaded')
        page.wait_for_timeout(300)
        shot_path = f'd:/SmartEdu/SmartEdu.DesignUI/27102026/shot_{name}.png'
        page.screenshot(path=shot_path, full_page=False)
        print(f'Captured desktop {shot_path}', flush=True)
        page.close()
        
        # Mobile
        page_m = browser.new_page(viewport={'width': 375, 'height': 667})
        page_m.goto(f'file:///d:/SmartEdu/SmartEdu.DesignUI/27102026/{pg}', wait_until='domcontentloaded')
        page_m.wait_for_timeout(300)
        shot_m_path = f'd:/SmartEdu/SmartEdu.DesignUI/27102026/shot_{name}_mobile.png'
        page_m.screenshot(path=shot_m_path, full_page=False)
        print(f'Captured mobile {shot_m_path}', flush=True)
        page_m.close()
        
    browser.close()
print("All screenshots captured!")
