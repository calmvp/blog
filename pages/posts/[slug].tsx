import {FC} from "react";
import { GetServerSideProps } from "next";
import axios, { AxiosError} from 'axios';
import PostContent from "@/components/posts/post-detail/post-content";
import { ContentPost, Post } from "@/components/posts/post";

interface PostDetailPageProps {
  post?: ContentPost,
  error?: boolean,
  notFound?: boolean
};

const PostDetailPage: FC<PostDetailPageProps> = ({ post, error, notFound }) => {
  return (
    <>
      { notFound && <p>Post Not Found</p>}
      { error && <p>An Error Occurred</p>}
      { post && <PostContent post={post} /> }
    </>
  )
}

export default PostDetailPage;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const slug = context.params?.slug;
  if (!slug) {
    return {
      props: {
        error: true
      }
    }
  }

  try {
    const { BASE_URL } = process.env;
    const res = await axios.get<ContentPost>(`${BASE_URL}/api/posts/${slug}`);
    
    return {
      props: {
        post: res.data
      }
    }
  } catch(err) {
    if (err instanceof AxiosError) {
      return err.response?.status === 404 ? { props: { notFound: true }} : { props: { error: true } }
    }
    return {
      props: {
        error: true
      }
    }
  }
}