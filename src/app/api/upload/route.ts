import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']);

const extFromMime: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
};

export async function POST(request: Request) {
  const pass = request.headers.get('x-admin-password');
  if (!process.env.ADMIN_PASS || pass !== process.env.ADMIN_PASS) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file field' }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 });
  }

  const type = file.type || '';
  if (!ALLOWED.has(type)) {
    return NextResponse.json(
      { error: 'Unsupported type. Use PNG, JPG, WebP, GIF, or SVG.' },
      { status: 400 },
    );
  }

  const ext = extFromMime[type] || '.bin';
  const name = `${randomUUID()}${ext}`;
  const dir = join(process.cwd(), 'public', 'uploads', 'portfolio');
  const path = join(dir, name);

  try {
    await mkdir(dir, { recursive: true });
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(path, buf);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Write failed';
    return NextResponse.json(
      {
        error:
          'Could not save file (read-only or serverless filesystem). Put the image in /public manually and paste the URL instead.',
        detail: msg,
      },
      { status: 503 },
    );
  }

  const url = `/uploads/portfolio/${name}`;
  return NextResponse.json({ url });
}
