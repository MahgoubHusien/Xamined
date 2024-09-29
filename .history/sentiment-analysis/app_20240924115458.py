from flask import Flask, request, jsonify
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax

app = Flask(__name__)

MODEL = "cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

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

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    results = analyze_sentiment(text)
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)


# @inproceedings{camacho-collados-etal-2022-tweetnlp,
#     title = "{T}weet{NLP}: Cutting-Edge Natural Language Processing for Social Media",
#     author = "Camacho-collados, Jose  and
#       Rezaee, Kiamehr  and
#       Riahi, Talayeh  and
#       Ushio, Asahi  and
#       Loureiro, Daniel  and
#       Antypas, Dimosthenis  and
#       Boisson, Joanne  and
#       Espinosa Anke, Luis  and
#       Liu, Fangyu  and
#       Mart{\'\i}nez C{\'a}mara, Eugenio" and others,
#     booktitle = "Proceedings of the 2022 Conference on Empirical Methods in Natural Language Processing: System Demonstrations",
#     month = dec,
#     year = "2022",
#     address = "Abu Dhabi, UAE",
#     publisher = "Association for Computational Linguistics",
#     url = "https://aclanthology.org/2022.emnlp-demos.5",
#     pages = "38--49"
# }
# @inproceedings{camacho-collados-etal-2022-tweetnlp,
#     title = "{T}weet{NLP}: Cutting-Edge Natural Language Processing for Social Media",
#     author = "Camacho-collados, Jose  and
#       Rezaee, Kiamehr  and
#       Riahi, Talayeh  and
#       Ushio, Asahi  and
#       Loureiro, Daniel  and
#       Antypas, Dimosthenis  and
#       Boisson, Joanne  and
#       Espinosa Anke, Luis  and
#       Liu, Fangyu  and
#       Mart{\'\i}nez C{\'a}mara, Eugenio" and others,
#     booktitle = "Proceedings of the 2022 Conference on Empirical Methods in Natural Language Processing: System Demonstrations",
#     month = dec,
#     year = "2022",
#     address = "Abu Dhabi, UAE",
#     publisher = "Association for Computational Linguistics",
#     url = "https://aclanthology.org/2022.emnlp-demos.5",
#     pages = "38--49"
# }
