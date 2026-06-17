import os
import requests
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from datetime import datetime

CONTEXT_DIR = "./.antigravity/context/google_labs"
os.makedirs(CONTEXT_DIR, exist_ok=True)

def harvest_labs_frontier():
    """Pulls frontier framework context from official research streams to ground our IDE agent."""
    feeds = [
        ("Google DeepMind", "https://deepmind.google/blog/feed/"),
        ("The Keyword", "https://blog.google/rss/")
    ]
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    for source_name, feed_url in feeds:
        print(f"[*] Fetching {source_name} context feed...")
        try:
            res = requests.get(feed_url, headers=headers, timeout=15)
            if res.status_code != 200:
                print(f"[-] Fetch failure for {source_name}: {res.status_code}")
                continue
            
            root = ET.fromstring(res.content)
            
            # Check if RSS
            items = root.findall('.//item')
            if items:
                # Standard RSS
                for item in items[:3]:
                    title = item.find('title')
                    title_text = title.text if title is not None else "Untitled Post"
                    
                    pub_date = item.find('pubDate')
                    pub_date_text = pub_date.text if pub_date is not None else datetime.utcnow().strftime("%Y-%m-%d")
                    try:
                        # Standard RSS date format: "Wed, 17 Jun 2026 12:00:00 +0000" or similar
                        parsed_date = datetime.strptime(pub_date_text[:25].strip(), "%a, %d %b %Y %H:%M:%S")
                        date_str = parsed_date.strftime("%Y-%m-%d")
                    except Exception:
                        date_str = datetime.utcnow().strftime("%Y-%m-%d")

                    content_encoded = item.find('{http://purl.org/rss/1.0/modules/content/}encoded')
                    description = item.find('description')
                    raw_html = ""
                    if content_encoded is not None and content_encoded.text:
                        raw_html = content_encoded.text
                    elif description is not None and description.text:
                        raw_html = description.text
                    
                    soup = BeautifulSoup(raw_html, 'html.parser')
                    markdown_ready_body = soup.get_text(separator='\n')
                    
                    safe_title = "".join(c for c in title_text.lower().replace(' ', '_') if c.isalnum() or c == '_')[0:25]
                    file_path = os.path.join(CONTEXT_DIR, f"labs_sync_{date_str}_{safe_title}.md")
                    
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(f"---\norigin: {source_name}\nsynced: {datetime.utcnow().isoformat()}\ntarget: Tiers 2-4 Optimisation\n---\n\n")
                        f.write(f"# {title_text}\n\n")
                        f.write("## MANDATORY ENGINEERING REVIEW DIRECTIVE\n")
                        f.write("Antigravity must validate all multi-agent token budgeting options and prompt architectures using these parameters:\n\n")
                        f.write(markdown_ready_body)
                        
                    print(f"[+] Local Ground Truth Asset Indexed: {file_path}")
            else:
                # Atom Feed
                ns = {'atom': 'http://www.w3.org/2005/Atom'}
                entries = root.findall('.//atom:entry', ns)
                if not entries:
                    # Try default namespace
                    entries = root.findall('.//{http://www.w3.org/2005/Atom}entry')
                
                for entry in entries[:3]:
                    title_elem = entry.find('.//atom:title', ns) or entry.find('.//{http://www.w3.org/2005/Atom}title')
                    title_text = title_elem.text if title_elem is not None else "Untitled Post"
                    
                    pub_elem = entry.find('.//atom:published', ns) or entry.find('.//{http://www.w3.org/2005/Atom}published')
                    pub_date_text = pub_elem.text if pub_elem is not None else datetime.utcnow().isoformat()
                    date_str = pub_date_text[:10]
                    
                    content_elem = entry.find('.//atom:content', ns) or entry.find('.//{http://www.w3.org/2005/Atom}content')
                    raw_html = content_elem.text if content_elem is not None else ""
                    
                    soup = BeautifulSoup(raw_html, 'html.parser')
                    markdown_ready_body = soup.get_text(separator='\n')
                    
                    safe_title = "".join(c for c in title_text.lower().replace(' ', '_') if c.isalnum() or c == '_')[0:25]
                    file_path = os.path.join(CONTEXT_DIR, f"labs_sync_{date_str}_{safe_title}.md")
                    
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(f"---\norigin: {source_name} (Atom)\nsynced: {datetime.utcnow().isoformat()}\ntarget: Tiers 2-4 Optimisation\n---\n\n")
                        f.write(f"# {title_text}\n\n")
                        f.write("## MANDATORY ENGINEERING REVIEW DIRECTIVE\n")
                        f.write("Antigravity must validate all multi-agent token budgeting options and prompt architectures using these parameters:\n\n")
                        f.write(markdown_ready_body)
                        
                    print(f"[+] Local Ground Truth Asset Indexed: {file_path}")
                    
        except Exception as e:
            print(f"[-] Context pipeline execution failure for {source_name}: {str(e)}")

if __name__ == "__main__":
    harvest_labs_frontier()
