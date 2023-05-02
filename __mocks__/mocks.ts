import { ContentPost } from "@/components/posts/post";

const featuredPost =   {
  title: 'my title',
  excerpt: 'test ex',
  date: '2022-04-05',
  image: 'test-image.jpg',
  slug: 'my-title',
  isFeatured: false,
  content: 'mock content'
};

const notFeaturedPost =  {
  title: 'here is a title',
  excerpt: 'test excerpt here',
  date: '2023-01-02',
  image: 'test-my-image.jpg',
  slug: 'here-is-a-slug',
  isFeatured: true,
  content: 'more mock content'
};

export const mockedPosts: ContentPost[] = [
  featuredPost,
  notFeaturedPost
];

export const mockedFeaturedPosts: ContentPost[] = [
  featuredPost
]