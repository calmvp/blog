import { NextApiRequest, NextApiResponse } from "next";
import { writeContact } from "../../services/contacts-service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ err: 'Method not allowed'});
    return;
  }

  try {
    const { contact } = req.body;
    await writeContact(contact);
    res.status(201).json({ message: 'Success'});
  } catch(err) {
    res.status(400).json({ err: 'Failed to write contact' });
    return;
  }
}

export default handler;