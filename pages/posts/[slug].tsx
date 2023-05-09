import {FC} from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
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
      <Head>
        <title>{post ? post.title : 'Error'}</title>
        <meta name='description' content={post ? post.excerpt : 'Something went wrong'} />
      </Head>
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
    const baseUrl = BASE_URL ? BASE_URL : process.env.VERCEL_URL;
    const res = await axios.get<ContentPost>(`${baseUrl}/api/posts/${slug}`);
    
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