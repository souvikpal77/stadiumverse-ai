from app.agents.base_agent import BaseAgent


class TranslationAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Translation Assistant",
            prompt_file="translation.txt"
        )

    async def execute(self, user_message: str, context=None):

        message = user_message.lower().strip()

        # -------------------------------------------------
        # Detect Target Language Automatically
        # -------------------------------------------------

        target_language = "English"

        languages = [
            "hindi",
            "bengali",
            "spanish",
            "french",
            "german",
            "arabic",
            "japanese",
            "korean",
            "chinese"
        ]

        for lang in languages:
            if lang in message:
                target_language = lang.title()
                break

        # -------------------------------------------------
        # Remove "translate"
        # -------------------------------------------------

        text = user_message

        lower = message

        if "translate" in lower:
            text = text[text.lower().find("translate") + len("translate"):].strip()

        if " to " in text.lower():

            idx = text.lower().rfind(" to ")

            text = text[:idx].strip()

        # -------------------------------------------------
        # Common Offline Translations
        # -------------------------------------------------

        OFFLINE = {

            "Hindi": {

                "hello": "नमस्ते",
                "thank you": "धन्यवाद",
                "where is my seat": "मेरी सीट कहाँ है?",
                "where is gate a": "गेट A कहाँ है?",
                "where is the restroom": "शौचालय कहाँ है?",
                "where is the food court": "फूड कोर्ट कहाँ है?",
                "i need help": "मुझे सहायता चाहिए।",
                "medical emergency": "चिकित्सा आपातकाल।"

            },

            "Bengali": {

                "hello": "হ্যালো",
                "thank you": "ধন্যবাদ",
                "where is my seat": "আমার সিট কোথায়?",
                "where is gate a": "গেট A কোথায়?",
                "where is the restroom": "টয়লেট কোথায়?",
                "where is the food court": "ফুড কোর্ট কোথায়?",
                "i need help": "আমার সাহায্য দরকার।",
                "medical emergency": "চিকিৎসা জরুরি অবস্থা।"

            },

            "Spanish": {

                "hello": "Hola",
                "thank you": "Gracias",
                "where is my seat": "¿Dónde está mi asiento?",
                "where is gate a": "¿Dónde está la puerta A?",
                "where is the restroom": "¿Dónde está el baño?",
                "where is the food court": "¿Dónde está el patio de comidas?",
                "i need help": "Necesito ayuda.",
                "medical emergency": "Emergencia médica."

            }

        }

        if (
            target_language in OFFLINE and
            text.lower() in OFFLINE[target_language]
        ):

            return (
                "🌍 Translation\n\n"
                f"Language : {target_language}\n\n"
                f"Original : {text}\n\n"
                f"Translation : {OFFLINE[target_language][text.lower()]}"
            )

        # -------------------------------------------------
        # Gemini Translation
        # -------------------------------------------------

        prompt = f"""
You are a professional translator.

Translate ONLY the given sentence.

Target Language: {target_language}

Rules:
- Keep Gate A, Gate B, Section A4, Food Court unchanged.
- Return only the translation.
- Do not explain.

Sentence:
{text}
"""

        translated = await super().execute(prompt, context)

        return (
            "🌍 Translation\n\n"
            f"Language : {target_language}\n\n"
            f"Original : {text}\n\n"
            f"Translation :\n\n{translated}"
        )