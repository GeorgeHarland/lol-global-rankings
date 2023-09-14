# Just a basic local server

from flask import Flask
import json

app = Flask(__name__)

print('Hi')

@app.route('/', methods=['GET'])
def hello():
    return json.dumps('Hello, world!')
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
