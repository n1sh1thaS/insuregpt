from flask import Flask, jsonify, request
import pandas as pd
import joblib

app = Flask(__name__)
model = joblib.load('premium-predictor.joblib')

gender_map = {
    'F':0,
    'M':1
}

@app.route('/predict', methods = ['POST'])
def predict():
    if(model==None): return ('model does not exist' )
    json_req = request.json
    query_df = pd.DataFrame(json_req)
    query_df['Gender'] = query_df['Gender'].map(gender_map)
    prediction = model.predict(query_df)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)