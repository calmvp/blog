import { NextApiRequest, NextApiResponse } from "next";
import { writeContact } from "../../services/contacts-service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ err: 'Method not allowed'});
    return;
  }

  const { contact } = req.body;
  if (validateEmail(contact.email)) {
    try {

      await writeContact(contact);
      res.status(201).json({ message: 'Success'});
      return;
    } catch(err) {
      res.status(500).json({ err: 'Failed to write contact' });
      return;
    }
  }

  return res.status(400).json({ err: 'Invalid email' });
}

const validateEmail = (input: string) : boolean => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  }

  return false;
}

export default handler;