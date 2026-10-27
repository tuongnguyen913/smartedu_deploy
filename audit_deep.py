import sys
import glob
from bs4 import BeautifulSoup

def run_deep_audit():
    print("=== DEEP AUDIT OF ALL 8 PAGES ===")
    
    html_files = sorted(glob.glob('d:/SmartEdu/SmartEdu.DesignUI/27102026/*.html'))
    all_pages = {}
    
    for f in html_files:
        fname = f.replace('\\', '/').split('/')[-1]
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        soup = BeautifulSoup(content, 'html.parser')
        
        # Collect all IDs
        ids = set(tag.get('id') for tag in soup.find_all(id=True))
        # Collect all hrefs
        hrefs = [a.get('href') for a in soup.find_all('a', href=True)]
        # Collect all images
        imgs = [img.get('src') for img in soup.find_all('img', src=True)]
        
        all_pages[fname] = {
            'ids': ids,
            'hrefs': hrefs,
            'imgs': imgs,
            'content': content,
            'soup': soup
        }

    # 1. Check anchor links
    print("\n--- 1. Anchor Link Verification ---")
    for fname, data in all_pages.items():
        for href in data['hrefs']:
            if '#' in href and not href.startswith('http') and not href == '#':
                target_file, target_id = href.split('#', 1)
                if not target_file:
                    target_file = fname
                if target_file in all_pages:
                    if target_id not in all_pages[target_file]['ids']:
                        print(f"BROKEN ANCHOR: in {fname} -> href='{href}' (id '{target_id}' missing in {target_file})")
                else:
                    print(f"BROKEN FILE TARGET: in {fname} -> href='{href}' ({target_file} not found)")

    # 2. Check modal triggers
    print("\n--- 2. Modal Trigger Verification ---")
    for fname, data in all_pages.items():
        open_assess = data['soup'].find_all(class_='open-assessment-modal')
        has_assess_modal = bool(data['soup'].find(id='assessmentModal') or data['soup'].find(id='modalAssessment'))
        if open_assess and not has_assess_modal:
            print(f"MODAL ISSUE: {fname} has {len(open_assess)} open-assessment-modal buttons but NO assessment modal in DOM!")
            
        open_faculty = data['soup'].find_all(class_='faculty-btn-bio')
        has_faculty_modal = bool(data['soup'].find(id='facultyModal') or data['soup'].find(id='modalFacultyBio'))
        if open_faculty and not has_faculty_modal:
            print(f"MODAL ISSUE: {fname} has {len(open_faculty)} faculty-btn-bio buttons but NO faculty modal in DOM!")

    # 3. Check mobile drawer triggers
    print("\n--- 3. Mobile Drawer Verification ---")
    for fname, data in all_pages.items():
        toggles = data['soup'].find_all(lambda el: el.name == 'button' and ('mobile-toggle' in (el.get('class') or []) or 'hamburger-btn' in (el.get('class') or []) or 'mobileMenuToggle' in (el.get('id') or '')))
        drawer = data['soup'].find(class_='mobile-menu-drawer')
        if not toggles:
            print(f"MOBILE NAV ISSUE: {fname} has NO hamburger toggle button!")
        if not drawer:
            print(f"MOBILE NAV ISSUE: {fname} has NO mobile drawer element!")
        if toggles and drawer:
            toggle_id = toggles[0].get('id')
            drawer_id = drawer.get('id')
            if toggle_id not in ['mobileMenuToggle', 'btnOpenMobileMenu']:
                print(f"MOBILE NAV ISSUE: {fname} toggle id='{toggle_id}' not recognized by main.js!")
            if drawer_id not in ['mobileMenuDrawer', 'mobileDrawer']:
                print(f"MOBILE NAV ISSUE: {fname} drawer id='{drawer_id}' not recognized by main.js!")

    # 4. Check Counters
    print("\n--- 4. Proof Counters Verification ---")
    for fname, data in all_pages.items():
        counters = data['soup'].find_all(class_='counter-value')
        print(f"{fname}: {len(counters)} counters")

if __name__ == '__main__':
    run_deep_audit()
