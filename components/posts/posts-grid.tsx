import { FC, HTMLAttributes } from "react";
import PostItem from "./post-item";
import classes from './posts-grid.module.css';
import { Post } from './post'

interface PostsGridProps extends HTMLAttributes<HTMLUListElement>{
  posts: Post[]
};

const PostsGrid: FC<PostsGridProps> = ({ posts, ...ulProps }) => {
  return (
    <ul className={classes.grid} {...ulProps}>
      {posts.map((p, i) => (
        <PostItem key={i} post={p} />
      ))}
    </ul>
  )
};

export default PostsGrid;