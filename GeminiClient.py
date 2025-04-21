import google.generativeai as genai
import re
import json

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
            # Try to get the model to return JSON directly
            prompt = f"""
            Create flashcards from the following summary. Based on the length and complexity of the content, 
            generate an appropriate number of flashcards (5-15) that cover the key concepts.

            Summary:
            {summary}

            Return ONLY a JSON array of objects with 'question' and 'answer' fields. 
            Format example:
            [
                {{"question": "What is X?", "answer": "X is Y"}},
                {{"question": "Who discovered Z?", "answer": "Z was discovered by W"}}
            ]
            
            Do not include any explanatory text, markdown formatting, or anything else outside of the JSON array.
            """
            
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Try to parse as JSON first
            try:
                # Find JSON-like content if it's embedded in other text
                json_pattern = r'(\[\s*\{\s*"question"\s*:.+\}\s*\])'
                json_match = re.search(json_pattern, response_text, re.DOTALL)
                
                if json_match:
                    response_text = json_match.group(1)
                
                # Clean up common JSON formatting issues
                response_text = response_text.replace("'", '"')  # Replace single quotes with double quotes
                
                flashcards = json.loads(response_text)
                if isinstance(flashcards, list) and len(flashcards) > 0:
                    # Validate the structure
                    valid_flashcards = []
                    for card in flashcards:
                        if isinstance(card, dict) and "question" in card and "answer" in card:
                            valid_flashcards.append({
                                "question": card["question"].strip(),
                                "answer": card["answer"].strip()
                            })
                    
                    if valid_flashcards:
                        return valid_flashcards
            except json.JSONDecodeError:
                print("JSON parsing failed, falling back to regex pattern matching")
            
            # Fallback to regex pattern matching
            flashcards = []
            
            # Try multiple pattern formats
            patterns = [
                # Format: Question: X Answer: Y
                r"(?:Question|Q):\s*(.*?)\s*(?:Answer|A):\s*(.*?)(?=(?:\n\s*(?:Question|Q):|$))",
                # Format: 1. Question: X Answer: Y
                r"\d+\.\s*(?:Question|Q):\s*(.*?)\s*(?:Answer|A):\s*(.*?)(?=(?:\n\s*\d+\.|$))",
                # Format: "question": "X", "answer": "Y"
                r'"question":\s*"(.*?)"\s*,\s*"answer":\s*"(.*?)"'
            ]
            
            for pattern in patterns:
                matches = re.findall(pattern, response_text, re.DOTALL | re.IGNORECASE)
                if matches:
                    for match in matches:
                        question = match[0].strip()
                        answer = match[1].strip()
                        if question and answer:  # Ensure neither is empty
                            flashcards.append({"question": question, "answer": answer})
                    
                    if flashcards:
                        break
            
            # If we still have no flashcards, try one more desperate approach
            if not flashcards:
                # Split by numbered items
                numbered_sections = re.split(r'\n\s*\d+[\.)]\s*', response_text)
                if len(numbered_sections) > 1:
                    # Skip the first element which might be empty or an intro
                    for section in numbered_sections[1:]:
                        parts = re.split(r'\n\s*', section, 1)
                        if len(parts) >= 2:
                            flashcards.append({
                                "question": parts[0].strip(),
                                "answer": parts[1].strip()
                            })
            
            # If we still have no flashcards, create a fallback
            if not flashcards:
                # Create a single fallback flashcard with some content from the summary
                summary_snippet = summary[:100] + "..." if len(summary) > 100 else summary
                flashcards = [
                    {"question": "What is the main topic of this document?", 
                     "answer": f"The document discusses: {summary_snippet}"},
                    {"question": "What might you want to learn from this document?",
                     "answer": "To understand the key concepts and information contained within."}
                ]
            
            return flashcards
        
        except Exception as e:
            print(f"Error generating flashcards: {e}")
            # Return at least some flashcards even in error case
            return [
                {"question": "What might be the main topic of this document?", 
                 "answer": "The document likely discusses important concepts related to the subject matter."},
                {"question": "Why are flashcards useful for learning?",
                 "answer": "Flashcards help with active recall, which strengthens memory and improves learning retention."}
            ]