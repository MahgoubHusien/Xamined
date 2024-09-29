from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Load the OpenAI API key and other configurations from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")
organization_id = os.getenv("OPENAI_ORGANIZATION_ID")  # Optionally, if you want to include organization and project
project_id = os.getenv("OPENAI_PROJECT_ID")

# ChatGPT integration using the OpenAI Chat API (from your provided format)
def ask_chatgpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # Ensure you're using the correct model name, as per your usage
            messages=[
                {"role": "user", "content": prompt}
            ],
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
