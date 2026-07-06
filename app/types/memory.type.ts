import { z } from "zod";

const memorySchema = z.object({
    sessionId: z.string(),

    userId: z.string(),

    role: z.enum(["USER", "ASSISTANT", "SYSTEM"]),

    content: z.array(
        z.object({
            text: z.string(),
        }),
    ),
});

type memoryType = z.infer<typeof memorySchema>;

export type {memoryType}