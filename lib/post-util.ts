import fs from 'fs';
import path from 'path';

import matter from 'gray-matter'
import { Post } from '@/components/posts/post';

interface PostData {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  content: string;
  isFeatured: boolean;
}

const postsDirectory = path.join(process.cwd(), 'posts');

function getPostData(fileName: string): PostData {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, '');
  const postData = {
    slug: postSlug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    image: data.image,
    isFeatured: data.isFeatured,
    content
  };
  return postData;
}

export function getAllPosts() {
  const postFileNames = fs.readdirSync(postsDirectory);
  const allPosts = postFileNames.map((postFileName) => {
    return getPostData(postFileName);
  });
  const sortedPosts = allPosts.sort((a, b) => a.date > b.date ? -1 : 1);
  return sortedPosts;
};

export function writePosts() {
  const posts = getAllPosts();
  posts.forEach(p => {
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(p)
    }).then(res => {
      console.log(res);
    });
  });
};