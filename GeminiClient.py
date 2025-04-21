import google.generativeai as genai

class GeminiClient:
    def __init__(self, api_key, model_name="gemini-2.0-flash-001"):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    def generate_content(self, prompt):
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Error generating content: {e}")

    def generate_flashcards(self, summary):
        try:
            prompt = f"Generate flashcards from the following summary:\\n{summary}\\n\\nFor each flashcard, provide the question and answer in the following format:\\nQuestion: question text\\nAnswer: answer text\\nSeparate each flashcard with a double newline."
            response = self.model.generate_content(prompt)
            flashcards_text = response.text
            flashcards = []
            for flashcard_str in flashcards_text.split('\\n\\n'):
                if "Question:" in flashcard_str and "Answer:" in flashcard_str:
                    try:
                        question = flashcard_str.split('Question:')[1].split('Answer:')[0].strip()
                        answer = flashcard_str.split('Answer:')[1].strip()
                        flashcards.append({"question": question, "answer": answer})
                    except Exception as e:
                        print(f"Error parsing flashcard: {e}")
            return flashcards
        except Exception as e:
            raise Exception(f"Error generating flashcards: {e}")