import agentMemory from "@/app/lib/agentMemory";
import { memoryType } from "@/app/types/Memory";

const addToShortTermMemory = async ({ sessionId, role, userId, content }: memoryType) => {
    try {
        await agentMemory.addSessionEvent({
            sessionId,
            role,
            actorId: userId,
            content,
            createdAt: new Date(),
        });

        const sessionMessages = await agentMemory.getSessionMemory(sessionId);

        return { success: true, response: sessionMessages , errors: null };
    } catch (error) {
        return { success: false, response: null , errors: error };
    }
};

const getShortTermMemory = async (sessionId: string) => {
    try {
        const sessionMessages = await agentMemory.getSessionMemory(sessionId);

        return { success: true, response: sessionMessages , errors: null };
    } catch (error) {
        return { success: false, response: null , errors: error };
    }
};

const deleteShortTermMemory = async (sessionId: string) => {
    try {
        await agentMemory.deleteSessionMemory(sessionId);
        return { success: true, response: "done" , errors: null };
    } catch (error) {
        return { success: false, response: "not done" , errors: error };
    }
};
export { addToShortTermMemory, getShortTermMemory, deleteShortTermMemory };
