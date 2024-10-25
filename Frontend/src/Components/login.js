import React, { useState, useEffect } from "react";
import "../CSS/login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [captchaStatus, setCaptchaStatus] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
    let uniqueChar = "";
    for (let i = 0; i < 5; i++) {
      uniqueChar += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
    }
    setCaptcha(uniqueChar);
    setUserInput("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userInput === captcha) {
      setCaptchaStatus("Matched");
      try {
        const response = await axios.post('http://localhost:5000/login', {
          username: formData.username,
          password: formData.password,
        });
        setMessage(response.data.message);
        if (response.status === 200) {
          navigate('/home');
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Username or PassWord Incorrect");
      }
    } else {
      setCaptchaStatus("Not Matched");
    }
    generateCaptcha();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="captcha-container">
            <div>
              <label htmlFor="captcha">Captcha</label>
              <input type="text" id="captcha" name="captcha" onChange={(e) => setUserInput(e.target.value)} placeholder="Enter Captcha Code" value={userInput} required />
            </div>
            <div className="captcha-code">
              <span>{captcha}</span>
            </div>
            <div className="captcha-refresh" onClick={generateCaptcha}>
              <i className="fas fa-sync-alt"></i>
            </div>
            <p id="key">{captchaStatus}</p>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>You Have Not Account?</p>
            <a href="/signup">Sign Up</a>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
