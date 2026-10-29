import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { ChatMistralAI } from "@langchain/mistralai";

const chatGoogleModel_31 = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite",
});
const chatGoogleModel_35 = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
});


// const chatMistralModelSmall = new ChatMistralAI({
//     model: "mistral-small-latest",
//     temperature: 0,
// });

// const chatMistralModelMedium = new ChatMistralAI({
//     model: "mistral-medium-latest",
//     temperature: 0,
// });

export {chatGoogleModel_31 , chatGoogleModel_35 }
