import { chatGoogleModel, chatMistralModel } from "./models";

const pingGoogle = async () => {
    const response = await chatGoogleModel.invoke("hii");
    return response.content;
};

const pingMistral = async () => {
    const response = await chatMistralModel.invoke("hii");
    return response.content;
};

export { pingGoogle, pingMistral };