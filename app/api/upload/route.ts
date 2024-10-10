import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    // Define the folder path and ensure it exists
    const uploadFolder = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    // Generate a random filename
    const randomFileName = crypto.randomBytes(16).toString('hex') + path.extname((file as File).name);

    // Define the full path for the file
    const filePath = path.join(uploadFolder, randomFileName);

    // Save the file to the folder
    const arrayBuffer = await (file as Blob).arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    // Construct the URL to access the file
    return NextResponse.json({ url: `/uploads/${randomFileName}` });
  } catch {
    return NextResponse.json({ error: 'Failed to process the file' }, { status: 500 });
  }
};