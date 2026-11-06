import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { categorySlugs } from './data/categories';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1, '标题不能为空'),
    description: z.string().min(1, '请填写一句话摘要，会显示在列表里'),
    category: z
      .string()
      .refine((value) => categorySlugs.includes(value), {
        message: `分类不在允许列表内，可选值：${categorySlugs.join('、')}`,
      }),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
