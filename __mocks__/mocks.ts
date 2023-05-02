import { ContentPost } from "@/components/posts/post";

export const mockedPosts: ContentPost[] = [
  {
    title: 'my title',
    excerpt: 'test ex',
    date: '2022-04-05',
    image: 'test-image.jpg',
    slug: 'my-title',
    isFeatured: false,
    content: 'mock content'
  },
  {
    title: 'here is a title',
    excerpt: 'test excerpt here',
    date: '2023-01-02',
    image: 'test-my-image.jpg',
    slug: 'here-is-a-slug',
    isFeatured: true,
    content: 'more mock content'
  }
];