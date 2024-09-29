from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax
import warnings

# Suppress specific transformer warnings if needed
warnings.filterwarnings("ignore", message=r"Some weights of the model checkpoint at.*")

app = Flask(__name__)

# Load the pre-trained model and tokenizer
MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"
try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    config = AutoConfig.from_pretrained(MODEL)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)
except Exception as e:
    print(f"Error loading the model or tokenizer: {e}")
    exit(1)

# Preprocess the input text
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        if t.startswith('@') and len(t) > 1:
            t = '@user'
        elif t.startswith('http'):
            t = 'http'
        new_text.append(t)
    return " ".join(new_text)

# Perform sentiment analysis
def analyze_sentiment(text):
    text = preprocess(text)
    # Set clean_up_tokenization_spaces to avoid future warnings
    encoded_input = tokenizer(text, return_tensors='pt', clean_up_tokenization_spaces=True)
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

# API route for sentiment analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        if 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        text = data['text']
        results = analyze_sentiment(text)
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app with debug mode on localhost
    app.run(host='127.0.0.1', port=5000, debug=True)
