import { Fragment } from "react";
import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { Post } from "@/components/posts/post";
const DUMMY_POSTS: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started With NextJs',
    image:'getting-started-nextjs.png',
    excerpt: 'NextJS is a React framework for production',
    date: '2022-02-10'
  }
];

function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  )
};

export default HomePage;