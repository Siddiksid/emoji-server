import { NextResponse } from "next/server";
import { emojis } from "@/lib/emojis";
export function GET(request, response) {
  return NextResponse.json({ success: "true", emojis: emojis });
}

export async function POST(request, response) {
  try {
    const { character, name } = await request.json();
    if ((!character && !name) || !character || !name) {
      return NextResponse.json({
        success: "false",
        error: "You must provide both name and character.",
      });
    }
    const emoji = {
      id: emojis.length + 1,
      name: name,
      character: character,
    };
    emojis.push(emoji);
    return NextResponse.json({ success: true, emoji });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
