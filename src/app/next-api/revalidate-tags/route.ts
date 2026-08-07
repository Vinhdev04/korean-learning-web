// app/api/revalidate-tags/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { tags } = await req.json();
  if (!Array.isArray(tags) || tags.length === 0) {
    return NextResponse.json({ success: false, message: 'No tags provided' }, { status: 400 });
  }

  try {
    await Promise.all(tags.map(tag => revalidateTag(tag)));
    return NextResponse.json({ success: true, revalidated: tags });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
