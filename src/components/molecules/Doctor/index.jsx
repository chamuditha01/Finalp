import React, { useState } from 'react';
import './Doc.css'; 
import image1 from './cbak1.jpg';

const Doctor = () => {
  const [showFull, setShowFull] = useState(false);

  const toggleReadMore = () => { 
    setShowFull(!showFull);
  };

  const toggleReadLess = () => {
    setShowFull(false);
  };

  const renderParagraph = (text) => {
    if (showFull) {
      return (
        <>
          <p className="para">{text}</p>
          <button onClick={toggleReadLess} className="read-more-btn">
            Read Less
          </button>
        </>
      );
    } else {
      const shortText = text.slice(0, 200);
      return (
        <>
          <p className="para">{shortText}</p>
          <button onClick={toggleReadMore} className="read-more-btn">
            Read More
          </button>
        </>
      );
    }
  };

  return (
  
    <div className="container1">
      <div className="container3" style={{ backgroundImage: `url(${image1})` }}>
         <h1 className="header__title fw__6 heder pading1 heading">Why Register with Us?</h1>
        <div className="welcome-section">
        <div className="text">
        <div className="stats__item text__light text__center" >
                                    <div className="img">
                                        <img src = "images/save.jpg" alt = "" className="imgg" />
                                    </div>
                                    <div className="stats__item--right">
                                      <div className="image-with-text">
                                    <img src="images/calendar.png" alt="" className="icon" />
                                  <span className="value fw__6">Effortless Appointment Booking</span>
                                  </div> 
                                  <div className="image-with-text">
                                    <img src="images/animal.png" alt="" className="icon" />
                                  <span className="value fw__6">Pet Cages  booking</span>
                                  </div> 
                                  <div className="image-with-text">
                                    <img src="images/vaccine.png" alt="" className="icon" />
                                  <span className="value fw__6">Vaccination Reminders</span>
                                  </div>
                                  <div className="image-with-text">
                                    <img src="images/discount.png" alt="" className="icon" />
                                  <span className="value fw__6">Exclusive Pet Shop Discounts</span>
                                  </div>
                                

                                      
                                        
                                    </div>
                                

  </div>

</div>

   
    </div>


        <h1 className="header__title fw__6 heder pading1">Dr.Pet EQUIPPED WITH</h1>
        <ul className="footer__links">
          <li className='left'>
            <div className="image-container">
              <img
                src="images/lab.png"
                alt="doc"
                className="social-icon2"
              />
              <h3 className="footer__title1">Advanced Laboratory</h3>
              {renderParagraph(
                "Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              )}
            </div>
            <div className="image-container">
              <img
                src="images/surgeon.png"
                alt="doc"
                className="social-icon2 "
              />
              <h3 className="footer__title1">Surgery</h3>
              {renderParagraph(
                "Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              )}
            </div>
            <div className="image-container">
              <img
                src="images/xray.png"
                alt="doc"
                className="social-icon2 round"
              />
              <h3 className="footer__title1">Digital X Ray</h3>
              {renderParagraph(
                "Our modern laboratory facilities will help our clients to get the laboratory tests done in one place without going anywhere else. All samples are handled with care and checked by well-experienced technical staff. Our Laboratory is capable of testing Hematology, Dermatology, Clinical Chemistry, UFR, and other laboratory tests for all the animals."
              )}
            </div>
          
         </li>
        <h1 className="header__title fw__6 heder ">Dr.Pet SPECIALISTS </h1>
         <li className='left'>
            <div className="image-container">
              <img
                src="images/thara.jpg"
                alt="doc"
                className=" round"
              />
              <h3 className="footer__title1">Mr.Tharanga</h3>
              <p className='para'>
                "I am Mr.Tharanga.We welcome everyone to our Pet Hospital in Galle! Come visit us at 225A, Matara Road, Magalle, Galle.You can call us on 0112923014 this number."
              </p>
            </div>
            <div className="image-container">
              <img
                src="images/melani.jpg"
                alt="doc"
                className=" round"
              />
              <h3 className="footer__title1">Miss.Melani</h3>
            <p className='para'>
                "I am Mis.Melani.We welcome everyone to our Pet Hospital in Galle! Come visit us at 225A, Matara Road, Magalle, Galle.You can call us on 0112923014 this number."
                </p>
            </div>
            <div className="image-container">
              <img
                src="images/matha.jpg"
                alt="doc"
                className="round"
              />
              <h3 className="footer__title1">Mr.Mathakaweera</h3>
              <p className='para'>
                "I am Mr.Mathakaweera.We welcome everyone to our Pet Hospital in Galle! Come visit us at 225A, Matara Road, Magalle, Galle.You can call us on 0112923014 this number."
              </p>
            
            </div>
           
          </li>

        </ul>
       
      </div>
    </div>
  );
};

export default Doctor;
