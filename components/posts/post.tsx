export interface Post {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  isFeatured: boolean;
}

export interface ContentPost extends Post {
  content: string;
}