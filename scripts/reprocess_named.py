"""Reprocesa con birefnet los PNG cuyo nombre contiene alguno de los terminos dados.
Uso: python scripts/reprocess_named.py bayern becken
Necesita los originales (jpg/jpeg/webp) presentes.
"""
import sys
import pathlib
from PIL import Image
from rembg import remove, new_session

root = pathlib.Path("public/camisetas")
SRC_EXTS = [".jpg", ".jpeg", ".webp"]
terms = [t.lower() for t in sys.argv[1:]] or ["bayern", "becken"]

targets = [p for p in sorted(root.rglob("*.png")) if any(t in p.name.lower() for t in terms)]
print(f"{len(targets)} objetivos: {[p.name for p in targets]}")

session = new_session("birefnet-general")
for i, p in enumerate(targets, 1):
    src = next((p.with_suffix(e) for e in SRC_EXTS if p.with_suffix(e).exists()), None)
    if not src:
        print(f"[{i}/{len(targets)}] SIN ORIGINAL {p.name}")
        continue
    with Image.open(src) as im:
        result = remove(im.convert("RGBA"), session=session)
    result.save(p)
    print(f"[{i}/{len(targets)}] rehecho {p.name}")
print("Listo.")
