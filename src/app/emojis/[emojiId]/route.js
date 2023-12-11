import { emojis } from "@/lib/emojis";
import { NextResponse } from "next/server";

export function GET(request, response) {
  const { emojiId } = response.params;
  console.log(emojiId);
  const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
  if (!emoji) {
    return NextResponse.json({
      success: false,
      message: "No emoji with that ID found.",
    });
  } else {
    return NextResponse.json({
      success: true,
      emoji: emoji,
    });
  }
}

// export function DELETE(request, response) {
//   const { emojiId } = response.params;
//   const emojiArr = emojis.filter((emoji) => emoji.id !== +emojiId);

export function DELETE(request, response) {
  try {
    const { emojiId } = response.params;
    const indexEmoji = emojis.findIndex((emoji) => emoji.id === +emojiId);

    if (indexEmoji === -1) {
      return NextResponse.json({
        success: false,
        error: "Emoji not found",
      });
    }

    emojis.splice(indexEmoji, 1);

    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(request, response) {
  try {
    const { emojiId } = response.params;
    const { character, name } = await request.json();

    const indexEmoji = emojis.findIndex((emoji) => emoji.id === +emojiId);

    if (indexEmoji === -1) {
      return NextResponse.json({
        success: false,
        error: "Emoji not found.",
      });
    }

    if (!character || !name) {
      return NextResponse.json({
        success: false,
        error: "You must provide a character and name to update an emoji.",
      });
    }

    emojis[indexEmoji].character = character;
    emojis[indexEmoji].name = name;

    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
