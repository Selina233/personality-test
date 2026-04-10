#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json

# 读取动物映射数据
with open('动物映射.json', 'r', encoding='utf-8') as f:
    animal_data = json.load(f)

# 读取 emoji 数据
with open('动物emoji.json', 'r', encoding='utf-8') as f:
    emoji_data = json.load(f)

# 创建 emoji 映射
emoji_map = {item['name']: item['emoji'] for item in emoji_data}

# 构建完整的动物数据库
animals_with_images = []
for animal in animal_data:
    emoji = emoji_map.get(animal['name'], '🐾')
    animals_with_images.append({
        'name': animal['name'],
        'tagline': animal['tagline'],
        'emoji': emoji,
        'image': f"images/{animal['name']}.svg",
        'traits': animal['traits'],
        'description': animal['description'],
        'strength': animal['strength'],
        'weakness': animal['weakness']
    })

# 输出为格式化的 JSON（用于嵌入到 JS 中）
json_str = json.dumps(animals_with_images, ensure_ascii=False, indent=2)

# 保存到文件
with open('animal-database.json', 'w', encoding='utf-8') as f:
    f.write(json_str)

print(f"✅ 生成了 {len(animals_with_images)} 种动物的数据")
print("已保存到 animal-database.json")
