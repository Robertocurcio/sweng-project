import http.server
import socketserver
import json
from urllib.parse import urlparse, parse_qs
from vecchiaestimate import *
import time

PORT = 3001

# RequestHandler is a subclass of http.server.CGIHTTPRequestHandler and overrides do_POST method

class RequestHandler(http.server.CGIHTTPRequestHandler):

    # Override send_response method to add CORS headers
    def send_response(self, code, message=None):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().send_response(code, message)

    def do_POST(self):

        # read the request data, expected in JSON format
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        json_data = json.loads(post_data.decode('utf-8'))

        # extract the values interested
        square_meters = int(json_data['square_meters'])
        num_bedrooms = int(json_data['num_bedrooms'])
        city = json_data['city']
        budget = json_data['budget']
        
        # run the function
        estimated_price = estimate_price(square_meters, city, num_bedrooms, budget)
        
        # Send the response
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = json.dumps({"estimated_price": estimated_price})
        self.wfile.write(response.encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Max-Age', '86400')
        self.end_headers()
        
# run creates an instance of the http.server.HTTPServer class and passes in the RequestHandler class as the handler
def run(server_class=http.server.HTTPServer, handler_class=RequestHandler):
    server_address = ('', PORT)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {PORT}. Open the browser and visit "http://localhost:{PORT}"')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
