from flask import Flask, request, jsonify
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import openai
import os
from dotenv import load_dotenv
import numpy as np
from scipy.special import softmax

load_dotenv()

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")
openai_model = os.getenv("OPENAI_MODEL", "gpt-4")  # Default to gpt-4 if not set

# Model and Tokenizer Paths for Sentiment Analysis
MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"

# Load the model and tokenizer for sentiment analysis
tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

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
    scores = output[0][0].detach().numpy()
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

# ChatGPT integration using the loaded environment variables
def ask_chatgpt(prompt):
    response = openai.ChatCompletion.create(
        model=openai_model,  # Use the model loaded from .env
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},  # Optional system message
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content']

# API Endpoint for Sentiment Analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    results = analyze_sentiment(text)
    return jsonify(results)

# API Endpoint for ChatGPT Interaction
@app.route('/chatgpt', methods=['POST'])
def chatgpt():
    data = request.json
    if 'prompt' not in data:
        return jsonify({'error': 'No prompt provided'}), 400

    prompt = data['prompt']
    try:
        # Call the ChatGPT API with the model specified in .env
        chatgpt_response = ask_chatgpt(prompt)
        return jsonify({"response": chatgpt_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
