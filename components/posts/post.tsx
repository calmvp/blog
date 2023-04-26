export interface Post {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}

export interface ContentPost extends Post {
  content: string;
}