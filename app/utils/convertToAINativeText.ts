import { SessionEvent } from "@redis-iris/agent-memory/models";
import { AIMessage, HumanMessage, SystemMessage } from "langchain";
import { z } from "zod";

// const eventsType = z.array(
//     z.object({
//         role: z.enum(["USER", "ASSISTANT", "SYSTEM"]),
//         content: z.array(z.object({ text: z.string() })),
//     }),
// );

// type et = z.infer<typeof eventsType>;

const convertToAINativeText = (events: SessionEvent[]) => {
    const messages = events.map((event) => {
        const text = event.content.map((c) => c.text).join("\n");

        switch (event.role) {
            case "USER":
                return new HumanMessage(text);

            case "ASSISTANT":
                return new AIMessage(text);

            case "SYSTEM":
                return new SystemMessage(text);
            default:
                return new AIMessage(text);
        }
    });

    return messages;
};

export default convertToAINativeText