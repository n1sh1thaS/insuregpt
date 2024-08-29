from flask import Blueprint, jsonify, request
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
import os

chat_bp = Blueprint('chat', __name__)

client = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY")
)

@chat_bp.route('/chat', methods = ['POST'])
def chat():
    try: 
        chatHistory = request.json['messages']
        completion = client.chat.completions.create(
            model = "gpt-4o-mini",
            messages=[{"role": "system", "content": "You are a car insurance claim agent. Guide users through the process of filing a car insurance claim by asking relevant questions and collecting all necessary information. Ensure you request details about the incident, personal information, vehicle information, any other parties involved, damage, and injuries. Users must upload all relevant documents (photos of damage, police reports, medical reports) on the designated website, not within the chat. Be concise and clear"}] + chatHistory,
        )
        message_content = completion.choices[0].message.content
        return jsonify({'completion': message_content})
        
    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': e})
