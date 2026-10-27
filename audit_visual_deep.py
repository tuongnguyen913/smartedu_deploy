import glob, os, sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

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
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    browser = p.chromium.launch(executable_path=chrome_path, headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    
    total_broken_images = 0
    total_console_errors = 0
    
    for p_name in pages:
        console_msgs = []
        page.on('console', lambda msg: console_msgs.append(msg.text) if msg.type == 'error' else None)
        
        url = f'file:///d:/27102026/{p_name}'
        page.goto(url, wait_until='networkidle')
        
        # Scroll to bottom and back up to trigger lazy images
        page.evaluate('''async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 400;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if(totalHeight >= scrollHeight){
                        clearInterval(timer);
                        window.scrollTo(0, 0);
                        resolve();
                    }
                }, 100);
            });
        }''')
        page.wait_for_timeout(1000)
        
        # Check broken images
        broken = page.evaluate('''() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
        }''')
        
        img_count = page.evaluate('() => document.querySelectorAll("img").length')
        if broken:
            print(f'[{p_name}] BROKEN IMAGES ({len(broken)}): {broken}')
            total_broken_images += len(broken)
        else:
            print(f'[{p_name}] All {img_count} images loaded perfectly.')
            
        if console_msgs:
            print(f'[{p_name}] Console errors: {console_msgs}')
            total_console_errors += len(console_msgs)
            
    browser.close()
    print(f'\nAudit completed! Broken images: {total_broken_images}, Console errors: {total_console_errors}')
