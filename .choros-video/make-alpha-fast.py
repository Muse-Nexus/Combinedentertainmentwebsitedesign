from pathlib import Path
from rembg import remove, new_session
from PIL import Image
import time

src = Path('.choros-video/frames-fast')
out = Path('.choros-video/cutout-fast')
out.mkdir(parents=True, exist_ok=True)
frames = sorted(src.glob('frame_*.png'))
session = new_session('u2netp')
start = time.time()
for i, frame in enumerate(frames, 1):
    target = out / frame.name
    if target.exists():
        continue
    img = Image.open(frame).convert('RGBA')
    result = remove(img, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10, alpha_matting_erode_size=6)
    result.save(target)
    if i % 6 == 0 or i == len(frames):
        print(f'{i}/{len(frames)} frames in {time.time()-start:.1f}s', flush=True)
