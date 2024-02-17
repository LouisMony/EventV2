import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/StyleRegister.scss';
import { useAuth } from '../../context/AuthProvider';

const SignIn = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [buttonContent, setButtonContent] = useState('Me connecter')
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setButtonContent('Chargement ...');

    const data = await login(formData.email, formData.password);
    if(data){
      console.log(data);
    }
    // if(error){
    //   console.log(error);
    //   setErrorMessage("Email or Password Incorrect");
    // }

    setIsLoading(false);
    setButtonContent('Me connecter');
  };

  return (
    <div className='register'>
      <h2>Me connecter</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Mot de passe</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button disabled={isLoading} className='mainButton' type="submit">{buttonContent}</button>
      </form>
      {errorMessage && <p style={{ color: 'red', fontSize: "12px", marginTop: "12px" }}>{errorMessage}</p>}
      <Link to={'/register/creer-un-compte'}>Je n'ai pas encore de compte.</Link>
    </div>
  );
};

export default SignIn;

