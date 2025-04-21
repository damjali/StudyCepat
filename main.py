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
        if file:
            if file.content_type != 'application/pdf':
                raise HTTPException(status_code=400, detail="Invalid file type")

            contents = await file.read()
            pdf_file = PyPDF2.PdfReader(io.BytesIO(contents))
            text = ""
            for page in pdf_file.pages:
                try:
                    text += page.extract_text()
                except Exception as e:
                    print(f"Error extracting text from page: {e}")
                    continue  # Skip to the next page if there's an error

        else:
            body = await request.body()
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
        try:
            summary = gemini_client.generate_content(final_prompt)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error generating summary: {e}")
        try:
            flashcards = gemini_client.generate_flashcards(summary)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error generating flashcards: {e}")
        return {"flashcards": flashcards}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

#to check if the server are able to receive data and return it back
@app.post("/echo")
async def echo_data(request: Request):
    data = await request.json()
    return data

@app.post("/read-pdf")
async def read_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF allowed.")

    try:
        contents = await file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
        text = ""

        for page in pdf_reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted

        if not text.strip():
            raise HTTPException(status_code=400, detail="No text found in PDF.")
        
        return {"extracted_text": text.strip()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF: {e}")