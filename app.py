from chalice import Chalice

app = Chalice(app_name='blue-buff-lambdas')

@app.route('/')
def hello():
    return {'message': 'Hello, world!'}

if __name__ == '__main__':
    app.debug = True
    app.run()
