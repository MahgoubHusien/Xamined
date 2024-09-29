from flask import Flask, request, jsonify
import openai
import os
from dotenv import load_dotenv
from transformers import AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax
import warnings

# Silence deprecation warning
warnings.filterwarnings("ignore", category=DeprecationWarning)

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Load the OpenAI API key and other configurations from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

# Use a valid OpenAI model, defaulting to "gpt-3.5-turbo" if not set
openai_model = os.getenv("OPENAI_MODEL", "gpt-4-0125-preview")

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

# Chatbot Class for ChatGPT interaction
class Chatbot:
    def __init__(self):
        self.context = [
            {"role": "system", "content": "You are a witty assistant, always answering with a Joke."},
        ]

    def chat(self, message):
        self.context.append(
            {"role": "user", "content": message}
        )
        try:
            # Call OpenAI API for chat completion
            response = openai.ChatCompletion.create(
                model=openai_model,
                messages=self.context
            )
            response_content = response.choices[0].message.content
            self.context.append(
                {"role": "assistant", "content": response_content}
            )
            return response_content
        except Exception as e:
            return str(e)

    # Placeholder function to handle displaying a face (you can modify as needed)
    def show_face(self, response_content):
        # This can display an image or render some visual based on response
        print("Displaying face based on response...")

    # Placeholder function to handle audio/sound (you can modify as needed)
    def speak(self, response_content):
        # Add any functionality for text-to-speech or playing sounds
        print("Speaking the response...")

    # Helper function to print chat logs
    def print_chat(self):
        for message in self.context:
            print(f"{message['role']}: {message['content']}")

# Instantiate Chatbot
chatbot = Chatbot()

# API Endpoint for Sentiment Analysis
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']
    results = analyze_sentiment(text)
    return jsonify(results), 200

# API Endpoint for ChatGPT Interaction with Chatbot Class
@app.route('/chatgpt', methods=['POST'])
def chatgpt():
    data = request.get_json()
    if not data or 'prompt' not in data:
        return jsonify({'error': 'No prompt provided'}), 400

    prompt = data['prompt']
    try:
        chatgpt_response = chatbot.chat(prompt)  # Use the Chatbot class to interact with OpenAI
        chatbot.show_face(chatgpt_response)  # Optional, modify as needed
        chatbot.speak(chatgpt_response)  # Optional, modify as needed
        return jsonify({"response": chatgpt_response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the app on 0.0.0.0 to make it accessible from outside
    app.run(host='0.0.0.0', port=5000, debug=True)
