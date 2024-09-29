from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv
from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Load the OpenAI API key and other configurations from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

# Use a valid OpenAI model, defaulting to "gpt-3.5-turbo" if not set
openai_model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")

# Set the model for sentiment analysis
MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"
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

# ChatGPT integration using the loaded environment variables
def ask_chatgpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model=openai_model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        # Access response using attribute access
        return response.choices[0].message.content.strip()
    except Exception as e:
        return str(e)

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
@app.route('/chatgpt', methods=['POST'])
def chatgpt():
    data = request.get_json()
    if not data or 'prompt' not in data:
        return jsonify({'error': 'No prompt provided'}), 400

    prompt = data['prompt']
    chatgpt_response = ask_chatgpt(prompt)
    return jsonify({"response": chatgpt_response}), 200

if __name__ == '__main__':
    # Run the app on 0.0.0.0 to make it accessible from outside
    app.run(host='0.0.0.0', port=5000, debug=True)
