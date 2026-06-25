import { chatGoogleModel, chatMistralModel } from "./models"

const googleChatSingle =async({msg}:{msg:string})=>{
     const response = await chatGoogleModel.invoke(msg)
     return response
}

const mistralChatSingle =async({msg}:{msg:string})=>{
     const response = await chatMistralModel.invoke(msg)
     return response
}

export {googleChatSingle , mistralChatSingle}