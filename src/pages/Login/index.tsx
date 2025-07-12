import React, { useState } from 'react';
import "./login.scss";
import Button from '../../components/Button';
import Input from '../../components/Input';
import { axiosInstance } from '../../services/APIConfig';
import { getAuthUser } from '../../contex/Auth';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken, setIsLoggedIn } = getAuthUser();
  const loaction = useLocation()
   console.log('Login submitted:', loaction);
  const navigate = useNavigate();
  const from = loaction.state?.from?.pathname || '/products';


  const handleSubmit = async(e) => {
    e.preventDefault();
   

    // Add login logic here
    const response = await axiosInstance.post("/login", { email, password });

    if(!response?.data?.accessToken) {
      console.log(response)
      throw new Error("failed to login")
    }
    setAccessToken(response?.data?.accessToken)
    setIsLoggedIn(true)
    navigate('/products', {replace: true})
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button />
      </form>
    </div>
  );
};

export default Login;
