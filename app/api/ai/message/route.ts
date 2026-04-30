export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { name, title } = await req.json();
    if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content: `Write a short, warm WhatsApp intro message (1-2 sentences) that someone would send after meeting ${name}${title ? `, who is a ${title}` : ""}.
No emojis. No quotes. Just the message text. Keep it under 30 words.`,
        },
      ],
    });

    const suggestion = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    return NextResponse.json({ suggestion });
  } catch {
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
