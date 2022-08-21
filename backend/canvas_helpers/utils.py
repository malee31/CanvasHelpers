import sys
from pathlib import Path

from django.conf import settings

BASE_URL = "https://canvas.ucdavis.edu"

_base_dir = Path(settings.BASE_DIR).parent
sys.path.append(str(_base_dir))

from src import logic

