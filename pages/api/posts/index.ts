global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET' && req.method !== 'POST')
  {
    res.status(405).json({ err: 'Method not allowed' });
    return;
  }

  // const client = await getClient(res);

  // if (!client) {
  //   res.status(404).json({ message: 'Could not connect to db' });
  //   return;
  // }

  // const db = client.db();

  // if (req.method === 'GET') {
  //   try {
  //     const { featured } = req.query;
  //     let posts;
      
  //     if (featured) {
  //       posts = await db.collection('posts')
  //         .find( { isFeatured: true })
  //         .sort( { _id: -1})
  //         .toArray();
  //     } else {
  //       posts = await db.collection('posts')
  //       .find()
  //       .sort({ _id: -1 })
  //       .toArray();
  //     }
      
  //     client.close();
  //     res.status(200).json(posts)
  //   } catch (err) {
  //     res.status(400).json({err: JSON.stringify(err)});
  //     return;
  //   }
  // }
  // if (req.method === 'POST') {
  //   try {
  //     const { posts } = req.body;

  //     const db = client.db();
  //     await db.collection('posts').insertMany(posts);
  //     client.close();

  //     res.status(201).json({ message: 'Success!' });
  //     return;
  //   } catch (err) {
  //     res.status(400).json({err: JSON.stringify(err)});
  //     return;
  //   }
  // };
}

const getClient = async (res: NextApiResponse) => {
  const { MONGO_BASE_URL, MONGOUSER, PASSWORD } = process.env;
  if (MONGO_BASE_URL && MONGOUSER && PASSWORD) {
    const endpoint = MONGO_BASE_URL.replace('<username>', MONGOUSER).replace('<password>', PASSWORD);
    const client = await MongoClient.connect(endpoint);
    // return client;
  } 
  // else {
  //   res.status(500).json({ err: 'Missing db configuration' });
  //   return;
  // }
}

export default handler;