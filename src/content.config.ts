import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    category: z.string(),
    order: z.number(),
    keywords: z.array(z.string()).default([]),
    publishedAt: z.string(),
    updatedAt: z.string(),
    reviewedBy: z.string().default('编辑部'),
    revisionNote: z.string().default('按公开资料与编辑整理发布；涉及服务表现的结论以测试记录为准。'),
    sources: z.array(z.object({ label: z.string(), url: z.string().url(), checkedAt: z.string() })).default([]),
  }),
});

export const collections = { guides };
