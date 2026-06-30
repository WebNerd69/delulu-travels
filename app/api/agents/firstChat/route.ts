import invokeConsultorAgent from "@/app/services/ai/agents/ConsultorAgent";
import { addToShortTermMemory } from "@/app/services/redis/ShortMemory";
import convertToAINativeText from "@/app/utils/convertToAINativeText";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import nameChat from "@/app/utils/nameChat";
import setCookie from "@/app/services/cookies/setCookies";

export async function POST(req: Request) {
    try {
        const { msg } = await req.json();
        const sesId = randomUUID();
        setCookie("sessionId", sesId)

        const { success, response, errors } = await addToShortTermMemory({
            sessionId: sesId,
            role: "USER",
            userId: "testUser1",
            content: [{ text: msg }],
        });

        if (response && success) {
            // convert the agentMemory to ai readable form
            const messages = convertToAINativeText(response.events);

            const [ sessionNameRes, aiResponse ] = await Promise.all([
                nameChat(msg),
                invokeConsultorAgent(messages),
            ]);

            const {
                success,
                response: res,
                errors,
            } = await addToShortTermMemory({
                sessionId: sesId,
                role: "ASSISTANT",
                userId: "testUser1",
                content: [{ text: JSON.stringify(aiResponse.messages.at(-1)?.content) }],
            });

            if (success) {
                console.log(res);
            }
            return NextResponse.json({
                msg: aiResponse.messages.at(-1)?.content,
                sessionName:sessionNameRes.content,
                sessionId:sesId,
                status: 200,
            });
        } else {
            return NextResponse.json({
                msg: `Some error occoured at our end : ${errors}`,
                sessionId:sesId,
                sessionName:"",
                status: 500,
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: error, status: 500 });
    }
}
