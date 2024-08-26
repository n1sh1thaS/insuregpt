from flask import Blueprint, jsonify, request
from openai import OpenAI

chat_bp = Blueprint('chat', __name__)

client = OpenAI(
  organization='YOUR_ORG_ID',
  project='$PROJECT_ID',
)

@chat_bp.route('/chat', methods = ['POST'])
def chat():
    try: 
        json_req = request.get_json()
        message = json_req.get('message')
        completion = client.chat.completions.create(
            model = "gpt-4o-mini",
            messages=[{"role": "user", "content": message}],
        )
        return jsonify({'completion': completion.choices[0].message['content']})
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': e})
