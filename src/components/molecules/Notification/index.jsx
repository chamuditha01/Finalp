import React, { useRef } from 'react';

import emailjs from 'emailjs-com';


export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_4cqizvz', 'template_utvo1s2', form.current, 'A0ZPR861WjTOAyAZq')
      .then((result) => {
          alert(result.text);
      }, (error) => {
          alert(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <input type="text" name="to_email" placeholder="Recipient Email" />
      <input type="submit" value="Send" />
    </form>
  );
};