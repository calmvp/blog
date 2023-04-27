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
      <button>Write Posts</button>
    </Fragment>
  )
};

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts');
  const data = await response.json();
  return {
    props: {
      posts: data.posts
    }
  }
}
export default HomePage;