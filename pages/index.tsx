import { FC, Fragment } from "react";
import axios from "axios";
import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { Post } from "@/components/posts/post";

interface HomePageProps {
  posts?: Post[],
  error?: boolean
}

const HomePage: FC<HomePageProps> = ({ posts, error }) => {
  posts?.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  return (
    <Fragment>
      <Hero />
      { error && <p>An Error Occurred</p> }
      {(!posts || posts.length === 0) && <p>No Featured Posts</p>}
      {(posts && posts.length > 0) && <FeaturedPosts posts={posts} />}
    </Fragment>
  )
};

export async function getStaticProps() {
  try {
    const { BASE_URL } = process.env;
    const { data } = await axios.get<Post[]>(`${BASE_URL}/api/posts?featured=true`);
    return {
      props: {
        posts: data
      }
    }
  } catch (err) {
    return {
      props: {
        error: true
      }
    }
  }
}
export default HomePage;