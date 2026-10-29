import { chatGoogleModel_31, } from "../models/models";

const googleChatSingle = async ({ msg }: { msg: string }) => {
    const response = await chatGoogleModel_31.invoke(msg);
    return response;
};

// const mistralChatSingle = async ({ msg }: { msg: string }) => {
//     const response = await chatMistralModelSmall.invoke(msg);
//     return response;
// };

export { googleChatSingle};
