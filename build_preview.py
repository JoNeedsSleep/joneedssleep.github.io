#!/usr/bin/env python3
"""Build a static preview of the Jekyll site without requiring Jekyll."""
import os, re, shutil

SITE_ROOT = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(SITE_ROOT, "_preview")

def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()

def strip_front_matter(text):
    if text.startswith("---"):
        end = text.index("---", 3)
        return text[end + 3:].lstrip("\n")
    return text

def render(layout_html, content, page_url="/", site_title="Jo Jiao", baseurl=""):
    html = layout_html
    html = html.replace("{{ site.title }}", site_title)
    html = html.replace("{{ site.baseurl }}", baseurl)
    html = html.replace("{{ content }}", content)

    # Handle {% unless page.url == "/" %}...{% endunless %}
    unless_pat = re.compile(
        r'\{%[-\s]*unless\s+page\.url\s*==\s*"/"\s*[-]?%\}(.*?)\{%[-\s]*endunless\s*[-]?%\}',
        re.DOTALL
    )
    if page_url == "/":
        html = unless_pat.sub("", html)
    else:
        html = unless_pat.sub(r"\1", html)

    # Strip any remaining Liquid tags
    html = re.sub(r'\{%.*?%\}', '', html)
    return html

def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

# Clean and recreate output dir
if os.path.exists(OUT_DIR):
    shutil.rmtree(OUT_DIR)
os.makedirs(OUT_DIR)

# Copy assets and favicon
for item in ["assets", "favicon.ico"]:
    src = os.path.join(SITE_ROOT, item)
    dst = os.path.join(OUT_DIR, item)
    if os.path.isdir(src):
        shutil.copytree(src, dst)
    elif os.path.isfile(src):
        shutil.copy2(src, dst)

layout = read(os.path.join(SITE_ROOT, "_layouts", "default.html"))

pages = [
    ("index.md",              "/",          os.path.join(OUT_DIR, "index.html")),
    ("research.md",           "/research/", os.path.join(OUT_DIR, "research", "index.html")),
    ("writing.md",            "/writing/",  os.path.join(OUT_DIR, "writing", "index.html")),
    ("scav-atm/index.html",   "/scav-atm/", os.path.join(OUT_DIR, "scav-atm", "index.html")),
    ("asi-wishlist/index.html", "/asi-wishlist/", os.path.join(OUT_DIR, "asi-wishlist", "index.html")),
    ("quantifying-elicitability/index.html", "/quantifying-elicitability/", os.path.join(OUT_DIR, "quantifying-elicitability", "index.html")),
    ("sqrt2-the-hard-way/index.html", "/sqrt2-the-hard-way/", os.path.join(OUT_DIR, "sqrt2-the-hard-way", "index.html")),
]

for src_file, url, dst_file in pages:
    content = strip_front_matter(read(os.path.join(SITE_ROOT, src_file)))
    html = render(layout, content, page_url=url)
    write(dst_file, html)
    print(f"Built: {dst_file.replace(OUT_DIR, '_preview')}")

# Copy standalone pages that have no Jekyll front matter
for name in ["piano.html", "image-conway-pattern.html", "image-judit-reigl.html"]:
    src = os.path.join(SITE_ROOT, name)
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(OUT_DIR, name))
        print(f"Copied: {name}")

print(f"\nPreview built in: {OUT_DIR}")
print("Serving at http://localhost:4000")
