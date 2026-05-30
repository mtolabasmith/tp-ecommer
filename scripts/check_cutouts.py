"""Detecta recortes con partes borradas: huecos internos, baja cobertura o fragmentacion."""
import pathlib
import numpy as np
from PIL import Image
from scipy import ndimage

root = pathlib.Path("public/camisetas")
pngs = sorted(root.rglob("*.png"))
flagged = []

for p in pngs:
    arr = np.array(Image.open(p).convert("RGBA"))
    alpha = arr[..., 3] > 30
    fg = int(alpha.sum())
    if fg == 0:
        flagged.append((p, 0.0, 1.0, 0.0))
        continue
    coverage = fg / alpha.size
    filled = ndimage.binary_fill_holes(alpha)
    hole_ratio = (int(filled.sum()) - fg) / max(int(filled.sum()), 1)
    lbl, n = ndimage.label(alpha)
    sizes = ndimage.sum(np.ones_like(lbl), lbl, range(1, n + 1)) if n else np.array([0])
    largest = sizes.max() / fg
    if hole_ratio > 0.03 or coverage < 0.15 or largest < 0.85:
        flagged.append((p, round(coverage, 3), round(hole_ratio, 3), round(largest, 3)))

for p, cov, hole, largest in sorted(flagged, key=lambda x: -x[2]):
    print(f"cov={cov:.3f} holes={hole:.3f} largest={largest:.3f}  {p.relative_to(root)}")
print(f"\nFLAGGED {len(flagged)}/{len(pngs)}")
