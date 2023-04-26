
import { FC } from 'react';
import PostsGrid from '../posts/posts-grid';
import { Post } from '../posts/post';
import classes from './featured-posts.module.css';

interface FeaturedPostsProps {
  posts: Post[]
}

const FeaturedPosts: FC<FeaturedPostsProps> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid id='featured-posts-grid' posts={posts} />
    </section>
  );
};

export default FeaturedPosts;