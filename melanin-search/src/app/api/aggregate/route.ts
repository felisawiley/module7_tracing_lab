import { NextResponse } from "next/server";
import { aggregateFromRSS, aggregateFromSource, getAggregatableSources } from "@/lib/aggregator";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sourceId = searchParams.get("source");
  const listSources = searchParams.get("list") === "true";

  try {
    if (listSources) {
      const sources = getAggregatableSources();
      return NextResponse.json({
        success: true,
        count: sources.length,
        sources: sources.map(s => ({
          id: s.id,
          name: s.name,
          url: s.url,
          rssUrl: s.rssUrl,
          categories: s.categories,
          isBlackOwned: s.isBlackOwned,
        })),
      });
    }

    let content;
    if (sourceId) {
      content = await aggregateFromSource(sourceId);
    } else {
      content = await aggregateFromRSS();
    }

    return NextResponse.json({
      success: true,
      count: content.length,
      aggregatedAt: new Date().toISOString(),
      content,
    });
  } catch (error) {
    console.error("Aggregation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to aggregate content" },
      { status: 500 }
    );
  }
}
