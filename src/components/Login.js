import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import bgImage from '../assets/bgImage.jpg';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    alert(`Login attempt for user: ${formData.username}`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    alert('Google login successful!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
    alert('Google login failed. Please try again.');
  };

  return (
    <div className="login-bg-wrapper"  style={{ backgroundImage: `url(${bgImage})` }}>
      {/* <video
        className="login-bg-video"
        src="C:\Users\verma\login-app\src\assets\video.jpg"
        autoPlay
        loop
        muted
        playsInline
      /> */}
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          <div className="google-login-container">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 