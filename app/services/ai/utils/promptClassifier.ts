import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0.0,
});

const isTravelRelated = async ( prompt: string ) => {
    const res = await model.invoke(`You are a classifier. Reply with exactly one word. YES = travel related. NO = not travel related. Question: ${prompt}`);
    return res;
};

export default isTravelRelated;
