import { chatGoogleModel_31 } from "../models/models";

const isTravelRelated = async ( prompt: string ) => {
    const res = await chatGoogleModel_31.invoke(`You are a classifier. Reply with exactly one word. YES = travel related. NO = not travel related. Question: ${prompt}`);
    return res;
};

export default isTravelRelated;
