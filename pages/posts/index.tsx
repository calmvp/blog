import { FC } from "react";
import AllPosts from "@/components/posts/all-posts";
import { ContentPost, Post } from "@/components/posts/post";

interface AllPostsPageProps {
  posts: ContentPost[];
}

const AllPostsPage: FC<AllPostsPageProps> = ({ posts }) => {
  console.log(posts);
  return (
    <>
      {posts && <AllPosts posts={posts} />}
    </>
  )
}

export async function getStaticProps() {
  const { BASE_URL } = process.env;
  const response = await fetch(`${BASE_URL}/api/posts`);
  const data = await response.json();
  return {
    props: {
      posts: data
    }
  }
}

export default AllPostsPage;