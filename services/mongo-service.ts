import { MongoClient } from "mongodb";

export const getClientDb = async () => {
  const { MONGO_BASE_URL, MONGOUSER, PASSWORD } = process.env;
  if (MONGO_BASE_URL && MONGOUSER && PASSWORD) {
    try {
      const endpoint = MONGO_BASE_URL.replace('<username>', MONGOUSER).replace('<password>', PASSWORD);
      const client = await MongoClient.connect(endpoint);

      return {
        client,
        db: client.db()
      };
    } catch(err) {
      throw new Error('Failed to connect to database');
    }
  } else {
    throw new Error('Missing db configuration');
  }
}