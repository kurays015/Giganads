import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.images.generate({
      prompt: prompt,
      // model: "dall-e-2", // Ensure you use the correct model name
      n: 1,
      size: "1024x1024",
    });

    console.log("responseeeeeee", response);

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    const imageUrl = response.data[0].url;

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to generate image" },
      { status: 500 }
    );
  }
}
