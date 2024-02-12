import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/StyleRegister.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
    } else {
      console.log('FormData:', formData);
      setErrorMessage('');
    }
  };

  return (
    <div className='register'>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nom d'utilisateur</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

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

        <label>
          <span>Confirmation de mot de passe:</span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button className='mainButton' type="submit">S'inscrire</button>
      </form>
      {errorMessage && <p className='formError_p'>{errorMessage}</p>}
      
      <Link to={'/register/me-connecter'}>J'ai déja un compte.</Link>
    </div>
  );
};

export default SignUp;
