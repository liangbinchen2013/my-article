export interface Category {
  slug: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: 'thinking',
    name: '思考',
    description: '关于时间、选择与日常秩序的观察和追问。',
  },
  {
    slug: 'reading',
    name: '阅读',
    description: '书与长文的读后笔记，以及值得反复回看的句子。',
  },
  {
    slug: 'methods',
    name: '方法',
    description: '可以反复使用的整理、写作与思考框架。',
  },
  {
    slug: 'writing',
    name: '写作',
    description: '关于表达、结构与叙事手艺的练习。',
  },
];

export const categorySlugs = categories.map((category) => category.slug);
