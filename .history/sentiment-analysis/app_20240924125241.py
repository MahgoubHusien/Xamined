from flask import Flask, request, jsonify
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax

# Initialize Flask app
app = Flask(__name__)

# Model and Tokenizer Paths
MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"

# Load the model and tokenizer
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
    # Preprocess the input text
    text = preprocess(text)
    
    # Encode the input text using the tokenizer
    encoded_input = tokenizer(text, return_tensors='pt')
    
    # Get model output
    output = model(**encoded_input)
    
    # Extract scores and apply softmax
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    
    # Get ranking of scores
    ranking = np.argsort(scores)[::-1]
    
    # Prepare the results in a structured format
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

# API Endpoint for Sentiment Analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    # Retrieve the JSON request data
    data = request.json
    
    # Validate if 'text' is provided in the request
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    
    # Analyze sentiment using the defined function
    results = analyze_sentiment(text)
    
    # Return the results as a JSON response
    return jsonify(results)

# Run the Flask app
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
