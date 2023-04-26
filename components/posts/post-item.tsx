import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './post-item.module.css';

interface Post {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}

interface PostItemProps {
  post: Post
}

const PostItem: FC<PostItemProps> = ( { post: { title, excerpt, date, image, slug }}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagePath = image && slug ? `/images/posts/${slug}/${image}` : undefined;

  return (
    <li>
      <Link href=''>
        {imagePath && <div className={classes.image}>
          <Image src={imagePath} alt={title} width={300} height={200} />
        </div>}
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;