import { FC, Fragment } from "react";
import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { Post, ContentPost } from "@/components/posts/post";
import { getAllPosts } from "lib/post-util";

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
  const onClickHandler = () => {
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ posts }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.json());
      })
  }

  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
      <button onClick={onClickHandler}>Write Posts</button>
    </Fragment>
  )
};

export function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts
    }
  }
}
export default HomePage;