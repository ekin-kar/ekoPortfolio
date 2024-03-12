import { getAssets } from "@/lib/binanceUtils";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const data = await getAssets();
    return NextResponse.json(data);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
