import invokeConsultorAgent from "@/app/services/ai/agents/ConsultorAgent";
import { addToShortTermMemory } from "@/app/services/redis/ShortMemory";
import convertToAINativeText from "@/app/utils/convertToAINativeText";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { msg } = await req.json();

        const { success, response, errors } = await addToShortTermMemory({
            sessionId: "test-1",
            role: "USER",
            userId: "testUser1",
            content: [{ text: msg }],
        });

        if (response && success) {
            const messages = convertToAINativeText(response.events);

            const aiResponse = await invokeConsultorAgent(messages);
            const { success, response:res , errors } = await addToShortTermMemory({
                sessionId: "test-1",
                role: "ASSISTANT",
                userId: "testUser1",
                content: [{ text: JSON.stringify(aiResponse.messages.at(-1)?.content) }],
            });
            if(success){
               console.log(res)
            }
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
