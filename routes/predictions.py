from flask import Blueprint, jsonify, request

import pandas as pd
import joblib

predict_bp = Blueprint('predict', __name__)
try:
    model = joblib.load('./insurance-model/premium-predictor.joblib')
    feature_names = joblib.load('./insurance-model/feature_names.joblib')
except FileNotFoundError as e:
    print(f'File error: {e}')
except Exception as e:
    print(f'model did not load {e}')

@predict_bp.route('/predict', methods = ['POST'])
def predict():
    if(model==None): return ('model does not exist' )
    json_req = request.json
    print("Received data:", json_req)
    print("Type of json_req:", type(json_req))
    query_df = pd.DataFrame([json_req])
    missing_cols = set(feature_names) - set(query_df.columns)
    for col in missing_cols:
        query_df[col] = 0
    query_df = query_df[feature_names]
    prediction = model.predict(query_df)
    return jsonify({'prediction': prediction.tolist()})