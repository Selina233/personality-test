#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import os
from pathlib import Path

# 读取动物数据
with open('动物emoji.json', 'r', encoding='utf-8') as f:
    animals = json.load(f)

# 创建 images 文件夹
images_dir = Path('images')
images_dir.mkdir(exist_ok=True)

# 简单的 emoji 到 SVG 转换（直接使用 emoji 作为 SVG text）
def emoji_to_svg(emoji, size=128):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}">
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="{size * 0.75}" font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif">
    {emoji}
  </text>
</svg>'''
    return svg

print('开始生成像素画...')
for i, animal in enumerate(animals, 1):
    svg = emoji_to_svg(animal['emoji'])

    filename = images_dir / f"{animal['name']}.svg"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(svg)

    print(f"[{i}/{len(animals)}] ✓ {animal['name']}.svg")

print(f"\n✅ 完成！生成了 {len(animals)} 个 SVG 文件，保存在 images/ 文件夹中")
