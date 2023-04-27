import AllPosts from "@/components/posts/all-posts";
import { Post } from "@/components/posts/post";

const DUMMY_POSTS: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started With NextJs',
    image:'getting-started-nextjs.png',
    excerpt: 'NextJS is a React framework for production',
    date: '2022-02-10',
    isFeatured: false
  }
];

const AllPostsPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />
}

export default AllPostsPage;