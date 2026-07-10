import os
import re
import requests

def download_fonts():
    base_dir = "/Users/arajiv/GitHub/AiInteg"
    fonts_dir = os.path.join(base_dir, "public", "fonts")
    os.makedirs(fonts_dir, exist_ok=True)

    urls = [
        ("https://fonts.googleapis.com/css2?family=Geist:wght@400;700;800&family=Hanken+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap", "fonts.css"),
        ("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap", "material_symbols.css")
    ]

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    css_contents = []

    for url, output_name in urls:
        print(f"Fetching: {url}")
        r = requests.get(url, headers=headers)
        if r.status_code != 200:
            print(f"Error fetching font CSS: {r.status_code}")
            continue

        css_content = r.text

        # Find all url(...) declarations
        font_urls = re.findall(r'url\((https://[^\)]+)\)', css_content)
        for font_url in font_urls:
            filename = font_url.split('/')[-1]
            local_path = os.path.join(fonts_dir, filename)
            
            if not os.path.exists(local_path):
                print(f"Downloading: {filename}")
                fr = requests.get(font_url)
                if fr.status_code == 200:
                    with open(local_path, "wb") as f:
                        f.write(fr.content)
                else:
                    print(f"Error downloading font: {fr.status_code}")
            
            # Replace remote URL with local path relative to public/
            css_content = css_content.replace(font_url, f"/fonts/{filename}")
        
        css_contents.append(css_content)

    # Combine both font CSS definitions into one file
    combined_css = "\n\n".join(css_contents)
    output_css_path = os.path.join(base_dir, "src", "styles", "fonts.css")
    os.makedirs(os.path.dirname(output_css_path), exist_ok=True)
    with open(output_css_path, "w", encoding="utf-8") as f:
        f.write(combined_css)
    print("Fonts CSS saved successfully!")

if __name__ == "__main__":
    download_fonts()
