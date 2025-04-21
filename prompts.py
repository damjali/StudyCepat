# prompts.py

prompt = """
Please summarize the following article in a comprehensive but concise way. 
Focus on the key points, main arguments, and important details.
Include enough specific information that someone could create multiple flashcards from your summary.

Article:
{article}

Your summary should be:
1. Structured with clear sections or topics
2. Include specific facts, concepts, and terminology that would be useful for learning
3. Cover the breadth of information in the original text
4. Be approximately 1/3 of the original length or around 500-800 words for longer documents

Make sure your summary retains enough specific information that it can be used to generate 5-15 flashcards.
"""