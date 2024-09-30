from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoConfig, pipeline
import openai
import numpy as np
from scipy.special import softmax
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# OpenAI API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_MODEL = os.getenv('OPENAI_MODEL')
openai.api_key = OPENAI_API_KEY

# Sentiment Analysis Model
MODEL_NAME = "cardiffnlp/twitter-roberta-base-sentiment-latest"

# Load the tokenizer, config, and model
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
config = AutoConfig.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

# Sentiment pipeline
sentiment_task = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

# Preprocessing function to replace usernames and links
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

# Sentiment Analysis Function
def analyze_sentiment(text):
    text = preprocess(text)
    results = sentiment_task(text)  # Use the pipeline for inference
    return results

# Chat Function using OpenAI's ChatGPT
def chat_with_openai(prompt):
    try:
        response = openai.ChatCompletion.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        assistant_response = response['choices'][0]['message']['content'].strip()
        return assistant_response
    except openai.OpenAIError as e:
        return f"An error occurred: {str(e)}"
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"

# API Endpoint for Sentiment Analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']
    results = analyze_sentiment(text)
    return jsonify(results), 200

# API Endpoint for ChatGPT Interaction
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'prompt' not in data:
        return jsonify({'error': 'No prompt provided'}), 400

    prompt = data['prompt']
    response_text = chat_with_openai(prompt)
    return jsonify({'response': response_text}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
