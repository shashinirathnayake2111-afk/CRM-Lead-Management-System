import os
import sys
from pathlib import Path

# Set the project root and backend directory
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
BACKEND_DIR = ROOT_DIR / "backend"

# Add both to sys.path
sys.path.append(str(ROOT_DIR))
sys.path.append(str(BACKEND_DIR))

# Ensure the settings module is correctly pointed to
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'uplift_backend.settings')

from django.core.wsgi import get_wsgi_application

try:
    application = get_wsgi_application()
    app = application
except Exception as e:
    print(f"WSGI initialization failed: {e}")
    # Fallback to a minimal app if Django fails to load (to prevent 500 without info)
    def app(environ, start_response):
        status = '500 Internal Server Error'
        headers = [('Content-type', 'text/plain; charset=utf-8')]
        start_response(status, headers)
        return [f"Django Load Error: {str(e)}".encode('utf-8')]
    application = app
