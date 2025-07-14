import React, { useState } from 'react';
import "./login.scss";
import Button from '../../components/Button';
import Input from '../../components/Input';
import { axiosInstance } from '../../services/APIConfig';
import { getAuthUser } from '../../contex/Auth';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginFormInterface{
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormInterface>({email:"", password: ""});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<LoginFormInterface|null>(null);
  const { setAccessToken, setIsLoggedIn } = getAuthUser();
  const loaction = useLocation()
  const navigate = useNavigate();
  const from = loaction.state?.from?.pathname || '/products';

  // handleChange
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name="", value=""} = e.target;
    setFormData(f => ({...f, [name]:value}))
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    // Add login logic here
    try {
      await new Promise((res) => setTimeout(() => { res(1) }, 4000))
      const response = await axiosInstance.post("/login", { email, password });

      if (!response?.data?.accessToken) {
        console.log(response)
        throw new Error("failed to login")
      }
      setAccessToken(response?.data?.accessToken)
      setIsLoggedIn(true)
      
      navigate(from, { replace: true })
    } catch (error) {
       setError(true)
    } finally{
      setLoading(false)
    }

  };

  if(error) return <h1>Form submit error</h1>

  const { email="", password="" } = formData
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
          name="email"
          onChange={handleChange}
          error={error}
        />

        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          name="password"
          onChange={handleChange}
          error={error}
        />
        <Button loading={loading} />
      </form>
    </div>
  );
};

export default Login;
