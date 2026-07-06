import invokeConsultorAgent from "@/app/services/ai/agents/ConsultorAgent";
import { addToShortTermMemory } from "@/app/services/redis/ShortMemory";
import convertToAINativeText from "@/app/utils/convertToAINativeText";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { msg } = await req.json();

        // add to session memory to serve as agent memory
        const { success, response, errors } = await addToShortTermMemory({
            sessionId: "50824c61-10a2-4029-a53f-9b6caf408179",
            role: "USER",
            userId: "testUser1",
            content: [{ text: msg }],
        });

        if (response && success) {
            const messages = convertToAINativeText(response.events);

            // get ai response
            const aiResponse = await invokeConsultorAgent(messages);
            
            // add ai response to session memory
            await addToShortTermMemory({
                sessionId: "50824c61-10a2-4029-a53f-9b6caf408179",
                role: "ASSISTANT",
                userId: "testUser1",
                content: [{ text: JSON.stringify(aiResponse.messages.at(-1)?.content) }],
            });

            return NextResponse.json({ msg: aiResponse.messages.at(-1)?.content, status: 200 });
        } else {
            return NextResponse.json({
                msg: `Some error occoured at our end : ${errors}`,
                status: 500,
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: error, status: 500 });
    }
}
