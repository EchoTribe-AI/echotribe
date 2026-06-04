import http.server
import socketserver
import os
import signal

PORT = 5000

def kill_port(port):
    hex_port = format(port, '04X')
    target = f'00000000:{hex_port}'
    inode = None
    try:
        with open('/proc/net/tcp') as f:
            for line in f.readlines()[1:]:
                parts = line.split()
                if parts[1] == target and parts[3] == '0A':
                    inode = parts[9]
                    break
        if not inode:
            return
        for pid in os.listdir('/proc'):
            if not pid.isdigit():
                continue
            fd_path = f'/proc/{pid}/fd'
            try:
                for fd in os.listdir(fd_path):
                    try:
                        link = os.readlink(f'{fd_path}/{fd}')
                        if f'socket:[{inode}]' in link:
                            os.kill(int(pid), signal.SIGKILL)
                            print(f'Killed PID {pid} holding port {port}')
                            return
                    except OSError:
                        pass
            except OSError:
                pass
    except Exception as e:
        print(f'kill_port error: {e}')

kill_port(PORT)

import time
time.sleep(0.5)

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
