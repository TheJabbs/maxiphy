// File: backend/src/utils/compression.ts
import { promisify } from 'util';
import { gzip, gunzip } from 'zlib';

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

export async function compressJson(data: any): Promise<Buffer> {
    const jsonString = JSON.stringify(data);
    return await gzipAsync(jsonString);
}

export async function decompressJson(buffer: Buffer): Promise<any> {
    const decompressedBuffer = await gunzipAsync(buffer);
    return JSON.parse(decompressedBuffer.toString());
}