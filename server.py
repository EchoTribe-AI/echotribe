import http.server
import socketserver
import os
import subprocess

PORT = 5000

# Kill any existing process holding port 5000 before we bind
try:
    result = subprocess.run(
        ['lsof', '-ti', f':{PORT}'],
        capture_output=True, text=True, timeout=5
    )
    if result.stdout.strip():
        for pid in result.stdout.strip().split('\n'):
            if pid:
                try:
                    os.kill(int(pid), 9)
                    print(f"Killed old process {pid} on port {PORT}")
                except (ProcessLookupError, ValueError, PermissionError):
                    pass
except (subprocess.TimeoutExpired, FileNotFoundError):
    pass

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        print(format % args)

socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(('0.0.0.0', PORT), NoCacheHandler) as httpd:
    print(f'Serving on port {PORT}')
    httpd.serve_forever()
