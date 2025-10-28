import satori from 'satori';
import { initWasm, Resvg } from '@resvg/resvg-wasm';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let wasmInitialized = false;

interface OGImageOptions {
  width?: number;
  height?: number;
}

export async function generateOGImage(
  html: any,
  options: OGImageOptions = {}
) {
  const { width = 1200, height = 600 } = options;

  // Initialize WASM once
  if (!wasmInitialized) {
    const wasmPath = path.join(__dirname, '../../node_modules/@resvg/resvg-wasm/index_bg.wasm');
    const wasmBuffer = fs.readFileSync(wasmPath);
    await initWasm(wasmBuffer);
    wasmInitialized = true;
  }

  // Load fonts from @fontsource/inter
  const fontPath = path.join(__dirname, '../../node_modules/@fontsource/inter/files');
  const interRegular = fs.readFileSync(path.join(fontPath, 'inter-latin-400-normal.woff'));
  const interBold = fs.readFileSync(path.join(fontPath, 'inter-latin-700-normal.woff'));

  // Generate SVG with satori
  const svg = await satori(html, {
    width,
    height,
    fonts: [
      {
        name: 'Inter',
        data: interRegular,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: interBold,
        weight: 700,
        style: 'normal',
      },
    ],
  });

  // Convert SVG to PNG with resvg-wasm
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
