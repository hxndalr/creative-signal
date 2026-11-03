"""Regenerate the PWA icons from assets/brand/app-icon-1024.png (needs Pillow).
'any' icons keep the rounded square; maskable and Apple icons are flattened onto ink
so the platform can apply its own mask (the rings sit well inside the 80% safe zone)."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
src = Image.open(root / 'assets/brand/app-icon-1024.png').convert('RGBA')
out = root / 'assets/brand/icons'
out.mkdir(parents=True, exist_ok=True)

flat = Image.new('RGBA', src.size, (14, 14, 13, 255))
flat.alpha_composite(src)

for size in (192, 512):
    src.resize((size, size), Image.LANCZOS).save(out / f'icon-{size}.png', optimize=True)
flat.resize((512, 512), Image.LANCZOS).convert('RGB').save(out / 'maskable-512.png', optimize=True)
flat.resize((180, 180), Image.LANCZOS).convert('RGB').save(out / 'apple-touch-icon.png', optimize=True)
print('icons written to', out)
