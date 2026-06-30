import { chatGoogleModel, chatMistralModelSmall } from "../models/models";

const googleChatSingle = async ({ msg }: { msg: string }) => {
    const response = await chatGoogleModel.invoke(msg);
    return response;
};

const mistralChatSingle = async ({ msg }: { msg: string }) => {
    const response = await chatMistralModelSmall.invoke(msg);
    return response;
};

export { googleChatSingle, mistralChatSingle };
