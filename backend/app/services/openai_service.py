import os
import json

from dotenv import load_dotenv
from groq import Groq


from app.prompts.diagnostico_prompt import DIAGNOSTICO_PROMPT

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def get_chat_response(user_message: str):

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",

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