import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prediction = await replicate.predictions.get(params.id);
    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get prediction", detail: error },
      { status: 500 }
    );
  }
}
export const maxDuration = 60;

