from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import openai
import numpy as np
from scipy.special import softmax
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

MODEL = os.getenv("SENTIMENT_MODEL")

# Load the model and tokenizer for sentiment analysis
tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

openai.api_key = os.getenv('OPENAI_API_KEY')

from openai.error import OpenAIError

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
    encoded_input = tokenizer(text, return_tensors='pt')
    output = model(**encoded_input)
    scores = output.logits[0].detach().numpy()
    scores = softmax(scores)
    ranking = np.argsort(scores)[::-1]
    
    results = []
    for i in range(scores.shape[0]):
        label = config.id2label[ranking[i]]
        score = scores[ranking[i]]
        results.append({
            "rank": i + 1,
            "label": label,
            "score": np.round(float(score), 4)
        })
    return results

# Chat Function using OpenAI's ChatGPT
def chat_with_openai(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        # Access the assistant's reply
        assistant_response = response['choices'][0]['message']['content'].strip()
        return assistant_response
    except OpenAIError as e:
        # Handle OpenAI API errors
        return f"An error occurred: {str(e)}"
    except Exception as e:
        # Handle other exceptions
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
