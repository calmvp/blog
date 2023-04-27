import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, MongoError } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { BASE_URL, MONGOUSER, PASSWORD } = process.env;
    if (BASE_URL && MONGOUSER && PASSWORD) {
      const endpoint = BASE_URL.replace('<username>', MONGOUSER).replace('<password>', PASSWORD);
      console.log(endpoint);
      try {
        const { posts } = req.body;
        // const { title, excerpt, date, image, slug, content, isFeatured } = req.body;
        const client = await MongoClient.connect(endpoint);
        const db = client.db();
        // await db.collection('posts').insertOne({
        //   title,
        //   excerpt,
        //   date,
        //   image,
        //   slug,
        //   isFeatured,
        //   content
        // });
        await db.collection('posts').insertMany(posts);
        client.close();

        res.status(201).json({ message: 'Success!' });
      } catch (err) {
        res.status(400).json({err: JSON.stringify(err)});
      }
    } else { 
      res.status(500).json({err: 'My Internal Error'});
    }
  }
}

export default handler;