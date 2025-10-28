import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface OGImageOptions {
  width?: number;
  height?: number;
}

export async function generateOGImage(
  html: any,
  options: OGImageOptions = {}
) {
  const { width = 1200, height = 600 } = options;

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

  // Convert SVG to PNG with resvg
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
