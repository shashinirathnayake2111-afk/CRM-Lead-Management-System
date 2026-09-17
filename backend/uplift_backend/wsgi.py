import os
import sys
from pathlib import Path

# Set the project root and backend directory
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
BACKEND_DIR = Path(__file__).resolve().parent.parent

sys.path.insert(0, str(ROOT_DIR))
sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'uplift_backend.settings')

from django.core.wsgi import get_wsgi_application

# Global definitions to guarantee top-level visibility for Vercel
try:
    _django_app = get_wsgi_application()
    def application(environ, start_response):
        return _django_app(environ, start_response)
except Exception as e:
    print(f"WSGI initialization failed: {e}")
    def application(environ, start_response):
        status = '500 Internal Server Error'
        headers = [('Content-type', 'text/plain; charset=utf-8')]
        start_response(status, headers)
        return [f"Django Load Error: {str(e)}".encode('utf-8')]

# Alias for Vercel WSGI entry point
app = application
