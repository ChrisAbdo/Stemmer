import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  if (!request) {
    return NextResponse.json({ error: "No request" });
  }

  const { audioUrl } = await request.json();

  try {
    const output = await replicate.run(
      "cjwbw/demucs:25a173108cff36ef9f80f854c162d01df9e6528be175794b81158fa03836d953",
      {
        input: {
          audio: audioUrl,
        },
      }
    );

    console.log(output);
    return NextResponse.json(output);
  } catch (error) {
    console.log(error);
    return NextResponse.json("An error occurred. Please try again later.", {
      status: 500,
    });
  }
}
