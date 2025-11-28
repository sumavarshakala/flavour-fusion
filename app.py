import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY is not set.")

genai.configure(api_key=api_key)

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


def generate_recipe_blog(topic, word_count):
    model = genai.GenerativeModel("gemini-2.5-flash")
    prompt = f"""
    Write a detailed food-blog style recipe with intro story,
    ingredients list, steps, tips, and conclusion.
    Topic: {topic}
    Word count: ~{word_count}
    Format using <h2>, <h3>, <p>, <ul>, <li>.
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"<p>Error generating recipe: {e}</p>"


def generate_recipe_image(topic):
    """Generate an image URL."""
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        img = model.generate_image(f"High-quality appetizing food photo of {topic}")
        return img.image_url
    except:
        return None


@app.route("/api/generate", methods=["POST"])
def api_generate():
    data = request.get_json() or {}
    topic = data.get("topic", "")
    wc = int(data.get("word_count", 800))

    recipe_html = generate_recipe_blog(topic, wc)
    image_url = generate_recipe_image(topic)

    return jsonify({
        "recipe_html": recipe_html,
        "image_url": image_url
    })


if __name__ == "__main__":
    app.run(debug=True)
