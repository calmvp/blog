import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, MongoError } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { BASE_URL, USERNAME, PASSWORD } = process.env;
    if (BASE_URL && USERNAME && PASSWORD) {
      const endpoint = BASE_URL.replace('<username>', USERNAME).replace('<password>', PASSWORD);
      try {
        const { title, excerpt, date, image, slug, content } = req.body;

        const client = await MongoClient.connect(endpoint);
        const db = client.db();

        await db.collection('posts').insertOne({
          title: title,
          excerpt: excerpt,
          date: date,
          image: image,
          slug: slug,
          content: content
        });

        client.close();

        res.status(201);
      } catch (err) {
        res.status(400).json({err: JSON.stringify(err)});
      }
    }
    res.status(500).json({err: 'Internal Error'});
  }
}

export default handler;