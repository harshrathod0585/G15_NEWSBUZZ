import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [captcha, setCaptcha] = useState("");
    const [userInput, setUserInput] = useState("");
    const [captchaStatus, setCaptchaStatus] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 
    // Generate a new captcha when the component mounts
    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const randomChar =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
        let uniqueChar = "";
        for (let i = 0; i < 5; i++) {
            uniqueChar += randomChar.charAt(
                Math.floor(Math.random() * randomChar.length)
            );
        }
        setCaptcha(uniqueChar);
        setUserInput(""); // Clear input field
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (userInput !== captcha) {
            setCaptchaStatus("Captcha Not Matched");
            return;
        }
        
        // Check password confirmation
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            setMessage(response.data.message); // Display success message
            if (response.status === 200) {
              navigate('/login'); // Adjust the path if your login route is different
          }
        } catch (error) {
            setMessage(error.response?.data?.message || "Username or PassWord Incorrect");
        }
        
        generateCaptcha(); // Generate new captcha
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <div className="input-group">
                        <label htmlFor="name">UserName</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="you@gmail.com"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="create-password">Create Password</label>
                        <input
                            type="password"
                            id="create-password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            required
                        />
                    </div>
                    <div className="captcha-container">
                        <div>
                            <label htmlFor="captcha">Captcha</label>
                            <input
                                type="text"
                                id="captcha"
                                name="captcha"
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Enter Captcha Code"
                                value={userInput}
                                required
                            />
                        </div>
                        <div className="captcha-code">
                            <span>{captcha}</span>
                        </div>
                        <div className="captcha-refresh" onClick={generateCaptcha}>
                            <i className="fas fa-sync-alt"></i>
                        </div>
                        <p>{captchaStatus}</p>
                    </div>
                    <button type="submit" className="login-button">Sign Up</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default SignUp;
