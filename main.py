from fastapi import FastAPI, HTTPException, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import PyPDF2
import aiofiles
import io

import os
from dotenv import load_dotenv

from GeminiClient import GeminiClient
from prompts import prompt

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Article(BaseModel):
    article: Optional[str] = None

@app.post("/summarize")
async def summarize(file: UploadFile = File(None), article: Article = Article()):
    if file: 
        if file.content_type != 'application/pdf':
            raise HTTPException(status_code=400, detail="Invalid file type")

        try:
            contents = await file.read()
            pdf_file = PyPDF2.PdfReader(io.BytesIO(contents))
            text = ""
            for page in pdf_file.pages:
                text += page.extract_text()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error reading PDF: {e}")
    elif article.article:
        text = article.article
    else:
        raise HTTPException(status_code=400, detail="No article or file provided")
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not set")

    gemini_client = GeminiClient(api_key)
    try:
        final_prompt = prompt.format(article=text)
        summary = gemini_client.generate_content(final_prompt)
        flashcards = gemini_client.generate_flashcards(summary)
        return {"flashcards": flashcards}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
