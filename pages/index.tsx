import { FC, Fragment } from "react";
import axios from "axios";
import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { ContentPost } from "@/components/posts/post";

interface HomePageProps {
  posts?: ContentPost[],
  error?: boolean
}

const HomePage: FC<HomePageProps> = ({ posts, error }) => {
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
    const { data } = await axios.get<ContentPost[]>(`${BASE_URL}/api/posts?featured=true`);
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