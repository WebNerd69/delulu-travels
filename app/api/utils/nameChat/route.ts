import nameChat from "@/app/utils/nameChat";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { msg } = await req.json();
        const { content } = await nameChat(msg.trim());

        return NextResponse.json(
            {
                msg: content,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                msg: "Some error occoured at our end.",
            },
            { status: 500 },
        );
    }
}
