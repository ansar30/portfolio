import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

function sanitizePayload(body: Record<string, unknown>) {
  const { _id, __v, ...rest } = body;
  void _id;
  void __v;
  return rest;
}

export async function GET() {
  try {
    await connectToDatabase();
    const data = await Portfolio.findOne().lean();
    if (!data) {
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }
    const { _id, __v, ...doc } = data as Record<string, unknown>;
    void _id;
    void __v;
    return NextResponse.json(doc);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    const payload = sanitizePayload(body as Record<string, unknown>);
    const replaced = await Portfolio.findOneAndReplace({}, payload, {
      upsert: true,
      new: true,
      strict: false,
      runValidators: false,
    }).lean();
    const plain = replaced as Record<string, unknown> | null;
    if (!plain) {
      return NextResponse.json({ error: 'Save produced no document' }, { status: 500 });
    }
    const { _id, __v, ...doc } = plain;
    void _id;
    void __v;
    return NextResponse.json({ message: 'Portfolio updated successfully', data: doc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
