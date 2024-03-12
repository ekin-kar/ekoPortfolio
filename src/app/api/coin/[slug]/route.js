import { fetchAndLogSymbolPrice } from "@/lib/binanceUtils";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      throw new Error("Symbol not provided");
    }
    const data = await fetchAndLogSymbolPrice(slug + "USDT");
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in GET function:", err);
    throw new Error("Failed to fetch data!");
  }
};
