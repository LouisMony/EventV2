import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/StyleRegister.scss';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    console.log('FormData:', formData);
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

        <button type="submit">Me connecter</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Link to={'/register/creer-un-compte'}>Je n'ai pas encore de compte.</Link>
    </div>
  );
};

export default SignIn;

