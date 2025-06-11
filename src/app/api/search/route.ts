import { GetAIResponse } from "@/lib/ai-prompt";
import { cards } from "@/lib/cards";
import { cardType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const query = req?.nextUrl?.searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const response = await GetAIResponse(query);

    let parsedResponse: { ids: number[]; summary: string };
    try {
      parsedResponse =
        typeof response === "string" ? JSON.parse(response) : response;
    } catch (e) {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    const totalCards: cardType[] = cards.filter((card) =>
      parsedResponse.ids.includes(Number(card.id))
    );

    return NextResponse.json(
      { data: totalCards, summary: parsedResponse.summary },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { data: [], summary: "Failed to get credit cards" },
      { status: 500 }
    );
  }
}
