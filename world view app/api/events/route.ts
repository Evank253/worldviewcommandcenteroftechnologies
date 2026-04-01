import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://api.gdeltproject.org/api/v2/events/search?format=json&maxrecords=50'
  );

  const data = await res.json();

  const enriched = data.events.map((e: any) => ({
    ...e,
    timestamp: Date.now() - Math.random() * 86400000,
  }));

  return NextResponse.json({ events: enriched });
}