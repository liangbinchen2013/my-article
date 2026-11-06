import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type Category } from '../data/categories';

export type Post = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function groupByYear(posts: Post[]): { year: number; posts: Post[] }[] {
  const groups = new Map<number, Post[]>();

  for (const post of posts) {
    const year = post.data.pubDate.getUTCFullYear();
    const group = groups.get(year) ?? [];
    group.push(post);
    groups.set(year, group);
  }

  return [...groups.entries()].map(([year, items]) => ({ year, posts: items }));
}

export function getReadingStats(body?: string): { words: number; minutes: number } {
  const text = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~\-|]/g, ' ');

  const cjk = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latin = text.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  const words = cjk + latin;

  return { words, minutes: Math.max(1, Math.ceil(words / 400)) };
}

export function formatDate(date: Date, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'UTC',
    year: style === 'long' ? 'numeric' : undefined,
    month: 'long',
    day: 'numeric',
  }).format(date);
}
