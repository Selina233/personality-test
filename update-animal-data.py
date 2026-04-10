#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re

# 读取动物映射数据
with open('动物映射.json', 'r', encoding='utf-8') as f:
    animal_data = json.load(f)

# 读取 emoji 数据
with open('动物emoji.json', 'r', encoding='utf-8') as f:
    emoji_data = json.load(f)

# 创建 emoji 映射
emoji_map = {item['name']: item['emoji'] for item in emoji_data}

# 构建 JavaScript 数组
js_animals = []
for animal in animal_data:
    emoji = emoji_map.get(animal['name'], '🐾')
    traits = animal['traits']

    # 将特征转换为字符串key
    traits_str = f"{{O:'{traits['O']}',E:'{traits['E']}',C:'{traits['C']}',A:'{traits['A']}',N:'{traits['N']}'}}"

    js_obj = f'''{{
    name: "{animal['name']}",
    tagline: "{animal['tagline']}",
    emoji: "{emoji}",
    image: "images/{animal['name']}.svg",
    traits: {traits_str},
    description: "{animal['description']}",
    strength: "{animal['strength']}",
    weakness: "{animal['weakness']}"
  }}'''

    js_animals.append(js_obj)

# 生成完整的 JavaScript 代码
animals_js = f'''// 动物类型数据库（32种动物）
    const animalDatabase = [
  {','.join(js_animals)}
];'''

print("已生成动物数据库 JavaScript 代码")
print(f"共 {len(js_animals)} 种动物")

# 保存到文件
with open('animal-data.js', 'w', encoding='utf-8') as f:
    f.write(animals_js)

print("✅ 动物数据已保存到 animal-data.js")
