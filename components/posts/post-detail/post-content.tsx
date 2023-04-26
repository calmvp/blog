import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ContentPost } from "../post";
import PostHeader from "./post-header";
import classes from './post-content.module.css';

interface PostContentProps {
  post: ContentPost
};

const PostContent: FC<PostContentProps> = ({ post: { content, image, slug, title }}) => {
  const imagePath = `/images/posts/${slug}/${image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  )
}

export default PostContent;