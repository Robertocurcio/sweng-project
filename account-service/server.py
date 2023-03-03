import http.server
import socketserver
import json
from urllib.parse import urlparse, parse_qs
from registration import *
import time

PORT = 8000

#RequesHandler is a subclass of http.server.SimpleHTTPRequestHandler and overrids do_POST method

class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):

        #read the reqeust data, expected in JSON format
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        request_data = json.loads(post_data.decode('utf-8'))

        #extract the values interested
        email = request_data['email']
        password = request_data['password']

        if request_data['request'] == 'register':

            name = request_data['name']
            surname = request_data['surname']
            reg_status = Registration(email, password, name, surname)

            if reg_status:
                # Send the response
                self.send_response(200)
                #ensure the browser doesn't cache the response
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.end_headers()
            if not reg_status:
                # send conflict response
                self.send_response(409)
                self.send_header('Content-type', 'text/plain')
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.end_headers()

        if request_data['request'] == 'login':
            log_status = verify_password(email, password)

            if log_status == 2: #user found and pwd match
                # Send the response 
                self.send_response(200)
                #ensure the browser doesn't cache the response
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.end_headers()

            if  log_status == 1: #user found but pwd not match
                # send unauthorized response
                self.send_response(401)
                self.send_header('Content-type', 'text/plain')
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.end_headers()
                
            if log_status == 0: #user not found
                #send user not found response
                self.send_response(404)
                self.send_header('Content-type', 'text/plain')
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.end_headers()

                


#run creates an instance of the http.server.HTTPServer class and passes in the RequestHandles class as the handler
def run(server_class=http.server.HTTPServer, handler_class=RequestHandler):
    server_address = ('', PORT)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {PORT}. Open the browser and visit "http://localhost:{PORT}"')
    httpd.serve_forever()

if __name__ == '__main__':
    run()

