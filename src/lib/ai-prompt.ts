import { GoogleGenerativeAI } from "@google/generative-ai";
import { cards } from "./cards";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function GetAIResponse(query: string | null) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are a Smart Credit Card Assistant helping users find the best credit cards in India.

        Here is the list of all available credit cards:
        ${JSON.stringify(cards, null, 2)}

        The user query is: 
        "${query}"

        Instructions:

        1. If the query includes the word "compare" (case-insensitive), extract the two card names from the query and:
        - Respond with a JSON object:
            {
            "ids": [id1, id2],
            "summary": "Short comparison-based summary suggesting when to choose each."
            }
        - ONLY use card data from the provided list. Do NOT make up data.
        - Keep the summary short and helpful for a user deciding between the two.

        2. If the query is a general search (like "cards with lounge access", "best cards for cashback", etc.):
        - Respond with a JSON object:
            {
            "ids": [1, 4, 7],
            "summary": "Short helpful summary about the matched cards and their value."
            }
        - Only include the "id" fields from the card list that match the criteria.
        - Make sure the summary explains what kinds of cards were matched and why they are good.

        DO NOT include markdown, formatting, bullet points, tables, or extra explanation. Respond ONLY in **pure JSON format**, like:
        {
        "ids": [1, 4, 7],
        "summary": "These cards offer lounge access and cashback, ideal for frequent travelers."
        }
`;

    const result = await model.generateContent(prompt);
    const raw = await result.response.text();
    const cleaned = raw.replace(/```json\n?|```/g, "").trim();

    try {
        const parsed = JSON.parse(cleaned);
        parsed.ids = parsed.ids.map(Number);
        return parsed;
    } catch {
        try {
            const fallback = JSON.parse(cleaned);
            const inner =
                typeof fallback.data === "string"
                    ? JSON.parse(fallback.data)
                    : fallback.data;
            inner.ids = inner.ids.map(Number);
            return inner;
        } catch {
            return {
                ids: [],
                summary: "Could not understand the response. Please try again.",
            };
        }
    }
}
