import React, { useState,useEffect } from 'react';
import './login.css';
import { BiUser } from 'react-icons/bi';
import { BsFingerprint } from 'react-icons/bs';
import { connect } from 'react-redux';
import { loginRequest } from './authActions';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login({ login, isLoggedIn, loginError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      toast.success('Login successful!');
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);


  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
    }
  }, [loginError]);

  return (
    <>
      <div className="login_container">
        <div className="bubble"></div>
        <div className="bubble b1"></div>
        <div className="bubble b2"></div>
        <div className="login_container">
          <div className="login_window">
            <h1 id="login_title">Login</h1>
            <div className="login_form">
              <form method='POST' onSubmit={handleSubmit}>
                <div className="input_box">
                  <BiUser />
                  <input
                    type="text"
                    placeholder='Username'
                    name='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input_box">
                  <BsFingerprint />
                  <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  loginError: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(loginRequest(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
