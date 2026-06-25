import { chatGoogleModel, chatMistralModelSmall } from "./models";

const pingGoogle = async () => {
    const response = await chatGoogleModel.invoke("hii");
    return response.content;
};

const pingMistral = async () => {
    const response = await chatMistralModelSmall.invoke("hii");
    return response.content;
};

export { pingGoogle, pingMistral };