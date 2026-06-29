import agentMemory from "@/app/lib/agentMemory";
import { memoryType } from "@/app/types/Memory";

const addToShortTermMemory = async ({ sessionId, role, userId, content }: memoryType) => {
    await agentMemory.addSessionEvent({
        sessionId,
        role,
        actorId: userId,
        content,
        createdAt: new Date,
    });

    const sessionMessages = await agentMemory.getSessionMemory(sessionId)

    return sessionMessages
};


const getShortTermMemory = async(sessionId:string)=>{
     const sessionMessages = await agentMemory.getSessionMemory(sessionId)

     return sessionMessages
}

export { addToShortTermMemory , getShortTermMemory}