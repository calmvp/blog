import { FC } from "react";
import { ContentPost } from "../post";
import PostHeader from "./post-header";

interface PostContentProps {
  post: ContentPost
};

const PostContent: FC<PostContentProps> = ({ post: { content, image, slug, title }}) => {
  const imagePath = `/images/posts/${slug}/${image}`;
  return (
    <article>
      <PostHeader title={title} image={imagePath} />
      {content}
    </article>
  )
}

export default PostContent;