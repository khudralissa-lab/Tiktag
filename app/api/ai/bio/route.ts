export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { job, style } = await req.json();
    if (!job) return NextResponse.json({ error: "Missing job" }, { status: 400 });

    const toneMap: Record<string, string> = {
      professional: "professional and authoritative",
      casual: "friendly and approachable",
      creative: "creative and unique",
    };

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Write a short bio (2-3 sentences, max 80 words) for someone with this job: "${job}".
Tone: ${toneMap[style] || "professional"}.
Write in first person. No hashtags. No quotes. Just the bio text.`,
        },
      ],
    });

    const bio = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    return NextResponse.json({ bio });
  } catch {
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
