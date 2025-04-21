from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
import json
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

@app.get("/")
def read_root():
    return {"message": "The Server is Running!"}


@app.post("/summarize")
async def summarize(request: Request, file: UploadFile = File(None)):
    text = None
    try:
        body = await request.body()
        if file:
            if file.content_type != 'application/pdf':
                raise HTTPException(status_code=400, detail="Invalid file type")

            if not body:
                raise HTTPException(status_code=400, detail="Empty PDF file")

            pdf_file = PyPDF2.PdfReader(io.BytesIO(body))
            contents = await file.read()
            if not contents:
                raise HTTPException(status_code=400, detail="Empty PDF file")

            pdf_file = PyPDF2.PdfReader(io.BytesIO(contents))
            text = ""
            for page in pdf_file.pages:
                try:
                    text += page.extract_text()
                except Exception as e:
                    print(f"Error extracting text from page: {e}")
                    continue  # Skip to the next page if there's an error

        else:
            try:
                data = json.loads(body.decode())
                article = data.get("article")
                if article:
                    text = article
                else:
                    raise HTTPException(
                        status_code=400, detail="No article or file provided"
                    )
            except (json.JSONDecodeError, AttributeError) as e:
                raise HTTPException(
                    status_code=400, detail=f"Invalid JSON data: {e}"
                )

    except PyPDF2.errors.PdfReadError as e:
        raise HTTPException(status_code=400, detail=f"Invalid PDF file: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {e}")

    if not text:
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

#to check if the server are able to receive data and return it back
@app.post("/echo")
async def echo_data(request: Request):
    data = await request.json()
    return data
