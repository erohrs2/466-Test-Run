import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function GET() {
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all();
    return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
    const { name } = await req.json();
    const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
    const result = stmt.run(name);
    return NextResponse.json({ success: true, id: result.lastInsertRowid });
}
