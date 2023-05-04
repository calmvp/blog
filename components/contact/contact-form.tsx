import { useEffect, useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import classes from './contact-form.module.css';
import { Contact } from './contact';
import Notification from '../ui/notification';

const sendContactData = async (contactInfo: Contact) => {
  const response = await axios.post('/api/contact',
    {
      contact: contactInfo
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response || response.statusText.toLowerCase() !== 'created') {
    throw new Error(response.data.message || 'Something went wrong');
  }
}
const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [requestStatus, setRequestStatus] = useState('');
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestError('');
        setRequestStatus('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setContactInfo({...contactInfo, [event.target.id]: event.target.value });
  };

  const sendMessageHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData(contactInfo);
      setRequestStatus('success');
    } catch(err) {
      if (err instanceof Error) {
        setRequestError(err.message);
      }
      setRequestStatus('error');
    }
  }

  let notification = undefined;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is being sent'
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent!'
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'An Error Occurred',
      message: requestError
    };
  }

  return (
    <section className={classes.contact}>
      <h1>What Ails You, My Friend?</h1>
      <form className={classes.form} aria-label="contact-form" onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input 
              type='email' 
              id='email' 
              value={contactInfo.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input 
              type='text' 
              id='name' 
              value={contactInfo.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='message'>Your Message</label>
            <textarea 
              id='message' 
              rows={5}
              value={contactInfo.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/> }
    </section>
  );
};

export default ContactForm;