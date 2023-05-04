import { MongoClient } from "mongodb";
import { Contact } from "@/components/contact/contact";
import { getClientDb } from "./mongo-service";

export const writeContact = async (contact: Contact) => {
  const { client, db } = await getClientDb();
  await db.collection('contacts').insertOne(contact);
  client.close();
};