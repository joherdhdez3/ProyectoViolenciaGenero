import os
import json

from dotenv import load_dotenv
from openai import OpenAI

from app.prompts.diagnostico_prompt import DIAGNOSTICO_PROMPT

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def get_chat_response(user_message: str):

    response = client.chat.completions.create(
        model="gpt-4.1-mini",

        messages=[
            {
                "role": "system",
                "content": DIAGNOSTICO_PROMPT
            },

            {
                "role": "user",
                "content": user_message
            }
        ]
    )

    content = response.choices[0].message.content

    return json.loads(content)