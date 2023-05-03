import { FC } from "react";
import AllPosts from "@/components/posts/all-posts";
import { ContentPost, Post } from "@/components/posts/post";
import axios from "axios";

interface AllPostsPageProps {
  posts?: Post[];
  error?: boolean;
}

const AllPostsPage: FC<AllPostsPageProps> = ({ posts, error }) => {
  posts?.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
  
  return (
    <>
      {error && <p>An Error Occurred</p>}
      {(!posts || posts.length === 0) && <p>No Posts Found...</p>}
      {(posts && posts.length > 0) && <AllPosts posts={posts} />}
    </>
  )
}

export async function getStaticProps() {
  try {
    const { BASE_URL } = process.env;
    const { data } = await axios.get<Post[]>(`${BASE_URL}/api/posts`);
    return {
      props: {
        posts: data
      }
    }
  } catch(err) {
    return {
      props: {
        error: true
      }
    }
  }
}

export default AllPostsPage;