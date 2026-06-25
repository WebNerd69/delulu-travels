import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";

const chatGoogleModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
});

const chatMistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
});

export {chatGoogleModel , chatMistralModel}
