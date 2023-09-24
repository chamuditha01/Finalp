import React, { useState, useEffect } from 'react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const [isOtpSent, setIsOtpSent] = useState(false); 

  
  const handleSendOTP = (e) => {
    e.preventDefault();
    
    setTimeout(() => {
    
      startTimer();
      setIsOtpSent(true);
    }, 2000); 
  };

  
  const handleConfirmOTP = (e) => {
    e.preventDefault();
    
    onClose();
  };

  
  const startTimer = () => {
    setIsTimerActive(true);
    setSecondsLeft(60);

    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsTimerActive(false);
    }, 60000);
  };

  useEffect(() => {
    if (isTimerActive && secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isTimerActive, secondsLeft]);

  return (
    <div
      className={`modal ${isOpen ? 'show' : ''}`}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Forgot Password</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={isOtpSent ? handleConfirmOTP : handleSendOTP}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {isOtpSent ? (
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              ) : null}
              <div className="d-flex justify-content-center">
                {isOtpSent ? (
                  <button type="submit" className="btn btn-primary">
                    Confirm OTP
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Send OTP
                  </button>
                )}
              </div>
              {isOtpSent ? (
                <div className="text-center mt-2">
                  {isTimerActive ? (
                    <p>Resend OTP in {secondsLeft} seconds</p>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => setIsOtpSent(false)}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
