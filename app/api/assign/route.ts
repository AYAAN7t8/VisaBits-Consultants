// app/api/assign/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Store assignments (use a database in production)
const assignments: Record<string, string> = {};

export async function POST(request: NextRequest) {
  try {
    const { number, assignedTo } = await request.json();
    assignments[number] = assignedTo;
    console.log(`📌 Assigned ${number} → ${assignedTo}`);
    return NextResponse.json({ success: true, assignments });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ assignments });
}