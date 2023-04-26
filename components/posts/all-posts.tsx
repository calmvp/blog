import { FC } from 'react';
import classes from './all-posts.module.css';
import { Post } from './post';
import PostsGrid from './posts-grid';

interface AllPostsProps {
  posts: Post[];
}

const AllPosts: FC<AllPostsProps> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid id='all-posts-grid' posts={posts} />
    </section>
  )
}

export default AllPosts;