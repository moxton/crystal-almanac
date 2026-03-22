"""
Resize crystal images to 800x800 WebP for web use.
Converts from crystal-images/*.png → public/crystals/*.webp

Run: python3 scripts/resize-crystal-images.py
"""

from pathlib import Path
from PIL import Image

INPUT_DIR = Path("crystal-images")
OUTPUT_DIR = Path("public/crystals")
SIZE = (800, 800)
QUALITY = 82  # WebP quality (80-85 is sweet spot for photo content)

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    pngs = sorted(INPUT_DIR.glob("*.png"))
    existing = {f.stem for f in OUTPUT_DIR.glob("*.webp")}
    remaining = [p for p in pngs if p.stem not in existing]

    if not remaining:
        print(f"All {len(pngs)} images already converted!")
        return

    print(f"Converting {len(remaining)} images ({len(existing)} already exist)")
    print(f"  {SIZE[0]}x{SIZE[1]} WebP @ quality {QUALITY}")
    print(f"  Output: {OUTPUT_DIR.absolute()}")
    print("-" * 50)

    total_input = 0
    total_output = 0

    for i, png in enumerate(remaining):
        webp = OUTPUT_DIR / f"{png.stem}.webp"
        input_size = png.stat().st_size

        img = Image.open(png)
        img = img.resize(SIZE, Image.LANCZOS)
        img.save(webp, "WEBP", quality=QUALITY)

        output_size = webp.stat().st_size
        total_input += input_size
        total_output += output_size
        reduction = (1 - output_size / input_size) * 100

        print(f"[{i+1}/{len(remaining)}] {png.stem}: {input_size//1024}KB → {output_size//1024}KB ({reduction:.0f}% smaller)")

    print(f"\n{'='*50}")
    print(f"Total: {total_input//1024//1024}MB → {total_output//1024//1024}MB")
    print(f"Images: {OUTPUT_DIR.absolute()}")

if __name__ == "__main__":
    main()
