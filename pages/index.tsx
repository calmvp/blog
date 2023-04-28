import { FC, Fragment } from "react";
import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { Post, ContentPost } from "@/components/posts/post";

const DUMMY_POSTS: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started With NextJs',
    image:'getting-started-nextjs.png',
    excerpt: 'NextJS is a React framework for production',
    date: '2022-02-10',
    isFeatured: true
  }
];

interface HomePageProps {
  posts: ContentPost[]
}

const HomePage: FC<HomePageProps> = ({ posts }) => {
  return (
    <Fragment>
      <Hero />
      {posts && <FeaturedPosts posts={posts} />}
    </Fragment>
  )
};

export async function getStaticProps() {
  const { BASE_URL } = process.env;
  const response = await fetch(`${BASE_URL}/api/posts?featured=true`);
  const data = await response.json();
  return {
    props: {
      posts: data
    }
  }
}
export default HomePage;