import agentMemory from "@/app/lib/agentMemory/agentMemory";
import { z } from "zod";

const LTM = z.object({
    memories: z.array(
        z.object({
            id: z.string(),
            text: z.string(),
        }),
    ),
});

type LTMtype = z.infer<typeof LTM>;

const bulkCreateLongTermMemory = async (memories: LTMtype) => {
    try {
        await agentMemory.bulkCreateLongTermMemories(memories);
        return { msg: "bulk memory added", status: 201 };
    } catch (error) {
        console.log(error);
        return { msg: "some err occoured", status: 500 };
    }
};

const searchLongTermMemory = async (text: string) => {
    try {
        const response = agentMemory.searchLongTermMemory({
            text,
        });
        return response;
    } catch (error) {
        console.log(error);
        return { msg: "some err occoured", status: 500 };
    }
};

export { searchLongTermMemory, bulkCreateLongTermMemory };
