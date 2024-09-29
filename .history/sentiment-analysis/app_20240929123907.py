from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# ChatGPT integration using the OpenAI API (for openai >= 1.0.0)
def ask_chatgpt(prompt):
    try:
        # For openai >= 1.0.0
        response = openai.completions.create(
            model="gpt-4o-mini",  # Adjust this to the correct model
            prompt=prompt,
            max_tokens=150,
            temperature=0.7
        )
        return response['choices'][0]['text']
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
