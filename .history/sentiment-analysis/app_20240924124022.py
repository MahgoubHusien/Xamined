from flask import Flask, request, jsonify
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax

app = Flask(__name__)

# Load the model and tokenizer
MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

# Preprocess the input text
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

# Perform sentiment analysis
def analyze_sentiment(text):
    text = preprocess(text)
    encoded_input = tokenizer(text, return_tensors='pt', clean_up_tokenization_spaces=True)
    output = model(**encoded_input)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)

    # Get the labels and scores
    ranking = np.argsort(scores)[::-1]  # Sort scores in descending order
    results = []
    for i in range(scores.shape[0]):
        label = config.id2label[ranking[i]]  # Get label name
        score = scores[ranking[i]]  # Get score
        results.append({
            "rank": i + 1,
            "label": label,
            "score": np.round(float(score), 4)  # Round score for readability
        })
    return results

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
    # Run the Flask app on localhost with debug mode
    app.run(host='127.0.0.1', port=5000, debug=True)
