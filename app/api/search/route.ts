import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/data";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const matches = searchProducts(q, 6).map((p) => ({
    handle: p.handle,
    title: p.title,
    price: p.price,
    image: p.images[0],
  }));
  return NextResponse.json({ results: matches });
}
