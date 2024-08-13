from flask import Flask
from flask_cors import CORS
from routes.predictions import predict_bp

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

app.register_blueprint(predict_bp)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    print('app running')