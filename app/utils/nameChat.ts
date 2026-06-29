import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0.3,
});

const specificInstructions = `You are a travel chat title generator.

Generate a concise title for the travel conversation.

Rules:
- 2 to 5 words only.
- Focus on the main destination or travel intent.
- Use title case.
- No punctuation.
- No explanations.
- Return only the title.

Examples:
Goa Weekend Trip
Japan Winter Vacation
Bali Honeymoon
Ladakh Road Trip
Europe Budget Tour`;

const nameChat = async (prompt: string) => {
    const res = await model.invoke(`${specificInstructions} prompt: ${prompt}`);
    return res;
};

export default nameChat;
