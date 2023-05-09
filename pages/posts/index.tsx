import { FC } from "react";
import Head from "next/head";
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
      <Head>
        <title>All Posts</title>
        <meta 
          name="description" 
          content="Nullam quis magna ante." 
        />
      </Head>
      {error && <p>An Error Occurred</p>}
      {(!posts || posts.length === 0) && <p>No Posts Found...</p>}
      {(posts && posts.length > 0) && <AllPosts posts={posts} />}
    </>
  )
}

export async function getStaticProps() {
  try {
    const { BASE_URL } = process.env;
    const baseUrl = BASE_URL ? BASE_URL : process.env.VERCEL_URL;
    const { data } = await axios.get<Post[]>(`${baseUrl}/api/posts`);
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