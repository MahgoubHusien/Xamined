from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set the OpenAI API key from the environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

# ChatGPT integration using the /v1/chat/completions endpoint (for openai >= 1.0.0)
def ask_chatgpt(prompt):
    try:
        # Correct usage of openai.ChatCompletion.create()
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # You can use 'gpt-4' or 'gpt-3.5-turbo'
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )
        return response['choices'][0]['message']['content']
    except Exception as e:
        return str(e)

# API Endpoint for ChatGPT Interaction
@app.route('/chatgpt', methods=['POST'])
def chatgpt():
    data = request.json
    if 'prompt' not in data:
        return jsonify({'error': 'No prompt provided'}), 400

    prompt = data['prompt']
    try:
        chatgpt_response = ask_chatgpt(prompt)
        return jsonify({"response": chatgpt_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
