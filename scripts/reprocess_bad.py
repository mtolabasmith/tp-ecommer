"""Reprocesa con un modelo mejor (birefnet) solo los recortes detectados como malos.
Necesita los originales (jpg/jpeg/webp) presentes junto a los PNG.
"""
import pathlib
import numpy as np
from PIL import Image
from scipy import ndimage
from rembg import remove, new_session

root = pathlib.Path("public/camisetas")
SRC_EXTS = [".jpg", ".jpeg", ".webp"]


def is_bad(p):
    arr = np.array(Image.open(p).convert("RGBA"))
    alpha = arr[..., 3] > 30
    fg = int(alpha.sum())
    if fg == 0:
        return True
    cov = fg / alpha.size
    filled = ndimage.binary_fill_holes(alpha)
    hole = (int(filled.sum()) - fg) / max(int(filled.sum()), 1)
    lbl, n = ndimage.label(alpha)
    sizes = ndimage.sum(np.ones_like(lbl), lbl, range(1, n + 1)) if n else np.array([0])
    largest = sizes.max() / fg
    return hole > 0.03 or cov < 0.15 or largest < 0.85


bad = [p for p in sorted(root.rglob("*.png")) if is_bad(p)]
print(f"{len(bad)} recortes a rehacer")
session = new_session("birefnet-general")

for i, p in enumerate(bad, 1):
    src = next((p.with_suffix(e) for e in SRC_EXTS if p.with_suffix(e).exists()), None)
    if not src:
        print(f"[{i}/{len(bad)}] SIN ORIGINAL {p.name}")
        continue
    with Image.open(src) as im:
        result = remove(im.convert("RGBA"), session=session)
    result.save(p)
    print(f"[{i}/{len(bad)}] rehecho {p.name}")

print("Listo.")
