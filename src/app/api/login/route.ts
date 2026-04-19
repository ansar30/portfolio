import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
      return NextResponse.json({ success: true, token: "mock-admin-token-123" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
