export interface Category {
  slug: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: 'exam-essays',
    name: '考场范文',
    description: '考场作文与范文，记录认真书写的每一次练习。',
  },
];

export const categorySlugs = categories.map((category) => category.slug);
