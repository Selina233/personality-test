const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// 读取动物数据
const animals = require('./动物emoji.json');

// 创建 images 文件夹
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Emoji 转像素画
function emojiToPixelArt(emoji, size = 128, pixelSize = 8) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // 绘制 emoji
  ctx.font = `${size * 0.75}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, size / 2, size / 2);

  // 获取像素数据
  const imageData = ctx.getImageData(0, 0, size, size);
  const pixels = imageData.data;

  // 降低分辨率（像素化）
  const pixelGrid = Math.floor(size / pixelSize);
  const pixelatedData = [];

  for (let y = 0; y < pixelGrid; y++) {
    for (let x = 0; x < pixelGrid; x++) {
      let r = 0, g = 0, b = 0, a = 0, count = 0;

      for (let py = 0; py < pixelSize; py++) {
        for (let px = 0; px < pixelSize; px++) {
          const i = ((y * pixelSize + py) * size + (x * pixelSize + px)) * 4;
          if (pixels[i + 3] > 0) {
            r += pixels[i];
            g += pixels[i + 1];
            b += pixels[i + 2];
            a += pixels[i + 3];
            count++;
          }
        }
      }

      if (count > 0) {
        pixelatedData.push({
          x: x * pixelSize,
          y: y * pixelSize,
          r: Math.round(r / count),
          g: Math.round(g / count),
          b: Math.round(b / count),
          a: a / count / 255
        });
      }
    }
  }

  return { pixels: pixelatedData, size, pixelSize };
}

// 生成 SVG
function pixelDataToSVG(pixelData) {
  const { pixels, size, pixelSize } = pixelData;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="transparent"/>`;

  pixels.forEach(pixel => {
    const color = `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${pixel.a.toFixed(3)})`;
    svg += `<rect x="${pixel.x}" y="${pixel.y}" width="${pixelSize}" height="${pixelSize}" fill="${color}" shape-rendering="crispEdges"/>`;
  });

  svg += '</svg>';
  return svg;
}

// 生成所有动物的像素画
console.log('开始生成像素画...');
animals.forEach((animal, index) => {
  const pixelData = emojiToPixelArt(animal.emoji, 128, 8);
  const svg = pixelDataToSVG(pixelData);

  const filename = path.join(imagesDir, `${animal.name}.svg`);
  fs.writeFileSync(filename, svg, 'utf8');

  console.log(`[${index + 1}/${animals.length}] ✓ ${animal.name}.svg`);
});

console.log(`\n✅ 完成！生成了 ${animals.length} 个像素画，保存在 images/ 文件夹中`);
