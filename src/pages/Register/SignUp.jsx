import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/StyleRegister.scss';
import { supabase } from '../../supabase/client';
import ModalEmail from './ModalEmail';

const SignUp = () => {

  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [buttonContent, setButtonContent] = useState('Suivant')
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const register = (email, password) => supabase.auth.signUp({email, password });
  
  const addNewProfile = async (userId) =>{
    console.log(userId);
    const { data, error } = await supabase.from('profils').insert([
      { id: userId, 
        role: 'basic_user' 
      },
    ])
    .select() 
    return { data, error }
  }

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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
    } else {      
      try {
        setErrorMessage("");
        const { data, error } = await register(
          formData.email,
          formData.password
        );
        if (!error && data) {
          toggleModal()
        }
        if(error){
          setErrorMessage("Erreur lors de la création du compte.");
        }
      } catch (error) {
        setErrorMessage("Erreur lors de la création du compte.");
      }
      setErrorMessage('');
    }
    setIsLoading(false);
    setButtonContent('Suivant');
  };

  const toggleModal = () =>{
    setShowModal(!showModal)
  }

  return (
    <div className='register'>
      {showModal ? <ModalEmail closeFunction={toggleModal}/> : null }
      <h2>Créer un compte</h2>
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
          <span>Mot de passe (minimum 6 caractères)</span>
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
        <button disabled={isLoading} className='mainButton' type="submit">{buttonContent}</button>
      </form>
      {errorMessage && <p style={{ color: 'red', fontSize: "12px", marginTop: "12px" }}>{errorMessage}</p>}
      
      <Link to={'/register/me-connecter'}>J'ai déja un compte.</Link>
    </div>
  );
};

export default SignUp;
