from app.agents.base_agent import BaseAgent


class TranslationAgent(BaseAgent):

    def __init__(self):
        super().__init__(
            name="Translation Assistant",
            prompt_file="translation.txt"
        )

    async def execute(self, user_message: str, context=None):

        target_language = "English"

        if context:
            target_language = context.get(
                "target_language",
                target_language
            )

        message = user_message.lower()

        # ---------------------------------------
        # Hindi
        # ---------------------------------------

        if target_language.lower() == "hindi":

            phrases = {
                "where is my seat": "मेरी सीट कहाँ है?",
                "where is the restroom": "शौचालय कहाँ है?",
                "where is gate a": "गेट A कहाँ है?",
                "where is the food court": "फूड कोर्ट कहाँ है?",
                "i need help": "मुझे सहायता चाहिए।",
                "medical emergency": "चिकित्सा आपातकाल।"
            }

            for key, value in phrases.items():
                if key in message:
                    return (
                        "🌍 **Translation**\n\n"
                        f"Language : Hindi\n\n"
                        f"{value}"
                    )

        # ---------------------------------------
        # Bengali
        # ---------------------------------------

        if target_language.lower() == "bengali":

            phrases = {
                "where is my seat": "আমার সিট কোথায়?",
                "where is the restroom": "টয়লেট কোথায়?",
                "where is gate a": "গেট A কোথায়?",
                "where is the food court": "ফুড কোর্ট কোথায়?",
                "i need help": "আমার সাহায্য দরকার।",
                "medical emergency": "চিকিৎসা জরুরি অবস্থা।"
            }

            for key, value in phrases.items():
                if key in message:
                    return (
                        "🌍 **Translation**\n\n"
                        f"Language : Bengali\n\n"
                        f"{value}"
                    )

        # ---------------------------------------
        # Spanish
        # ---------------------------------------

        if target_language.lower() == "spanish":

            phrases = {
                "where is my seat": "¿Dónde está mi asiento?",
                "where is the restroom": "¿Dónde está el baño?",
                "where is gate a": "¿Dónde está la puerta A?",
                "where is the food court": "¿Dónde está el patio de comidas?",
                "i need help": "Necesito ayuda.",
                "medical emergency": "Emergencia médica."
            }

            for key, value in phrases.items():
                if key in message:
                    return (
                        "🌍 **Translation**\n\n"
                        f"Language : Spanish\n\n"
                        f"{value}"
                    )

        # ---------------------------------------
        # Gemini fallback
        # ---------------------------------------

        prompt = (
            f"Translate the following text into {target_language}. "
            "Keep stadium names like Gate A, Section A4 and Food Court unchanged.\n\n"
            f"Text:\n{user_message}"
        )

        return await super().execute(prompt, context)