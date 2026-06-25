import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";

const chatGoogleModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
});

const chatMistralModelSmall = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0,
});

const chatMistralModelMedium = new ChatMistralAI({
    model: "mistral-medium-latest",
    temperature: 0,
});

export {chatGoogleModel , chatMistralModelMedium , chatMistralModelSmall}
