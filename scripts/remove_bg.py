"""
Quita el fondo de las imagenes de camisetas y las guarda como PNG transparente.
Uso: python scripts/remove_bg.py
Requiere: pip install "rembg[cpu]" pillow
"""
import pathlib
from rembg import remove, new_session
from PIL import Image

ROOT = pathlib.Path("public/camisetas")
SRC_EXTS = {".jpg", ".jpeg", ".webp"}

session = new_session("isnet-general-use")

files = [p for p in ROOT.rglob("*") if p.suffix.lower() in SRC_EXTS]
print(f"Procesando {len(files)} imagenes...")

ok, err = 0, 0
for i, p in enumerate(files, 1):
    out = p.with_suffix(".png")
    try:
        with Image.open(p) as im:
            im = im.convert("RGBA")
            result = remove(im, session=session, post_process_mask=True)
            result.save(out)
        ok += 1
        print(f"[{i}/{len(files)}] OK {out.name}")
    except Exception as e:
        err += 1
        print(f"[{i}/{len(files)}] ERR {p.name}: {e}")

print(f"Listo. OK={ok} ERR={err}")
