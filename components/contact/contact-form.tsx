import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import classes from './contact-form.module.css';

const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const newObje = {...contactInfo, [event.target.id]: event.target.value }
    setContactInfo(newObje);
  };

  const sendMessageHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post('/api/contact',
      {
        contact: contactInfo
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
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
    </section>
  );
};

export default ContactForm;