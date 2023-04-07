import React, { useState } from 'react';
import './ContactSection.scoped.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function ContactSection() {
  const storeid = useParams().id;
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/store-settings', {
          params: { storeid: storeid },
        });

        const data = response.data;
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [contactData, setContactData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/contact', {
        name: event.target.elements.name.value,
        email: event.target.elements.email.value,
        phone: event.target.elements.phone.value,
        subject: event.target.elements.subject.value,
        message: event.target.elements.message.value,
        storeid: storeid,
      });

      setContactData(response.data);
      setShowSuccessMessage(true);

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      event.target.reset(); // Clear the form fields
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <div className="rt-container">
          <div className="col-rt-12">
            <div className="Scriptcontent">
              <div>
                <div className="container">
                  <div className="contact-parent">
                    <div className="contact-child child1">
                      <p>
                        <i className="fas fa-map-marker-alt"></i> Address <br />
                        <span> {data.Address}</span>
                      </p>

                      <p>
                        <i className="fas fa-phone-alt"></i> Let's Talk <br />
                        <span> {data.Phonenumber}</span>
                      </p>

                      <p>
                        <i className=" far fa-envelope"></i> General Support <br />
                        <span>{data.Email}</span>
                      </p>
                    </div>

                    <div className="contact-child child2">
                      <div className="inside-contact">
                        <h2>Contact Us</h2>
                        {showSuccessMessage && (
                          <h3>
                            <span id="confirm">Contact sent successfully!</span>
                          </h3>
                        )}

                        <form onSubmit={handleSubmit}>
                          <p>Name *</p>
                          <input name="name" type="text" required />

                          <p>Email *</p>
                          <input name="email" type="email" required />

                          <p>Phone *</p>
                          <input name="phone" type="tel" required />

                          <p>Subject *</p>
                          <input name="subject" type="text" required />

                          <p>Message *</p>
                          <textarea name="message" rows="4" cols="20" required></textarea>
                          <input type="submit" id="btn_send" value="SEND" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}