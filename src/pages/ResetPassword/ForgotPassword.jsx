import React, { useState } from 'react';
import { supabase } from '../../supabase/client';
import { ToastContainer} from 'react-toastify';
import { successToast } from '../../js/helpers';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email soumis:", email);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    
    if(!error){
        successToast("Email de réinitialisation envoyé")
    }
    else{
        alert('error')
    }
  };

  return (
    <div className='register'>
        <ToastContainer />
        <h2>Mot de passe oublié</h2>
        <p>Mot de passe oublié ? Indiquez ci-dessous votre adresse email pour recevoir un lien de réinitalisation de mot de passe .</p>
        <form onSubmit={handleSubmit}>
            <label>
            <span>Email</span>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            </label>
            <button className='mainButton' type="submit">Réinitialiser</button>
            <Link to={'/register/me-connecter'}>J'ai déja un compte.</Link>
        </form>
    </div>
  );
};

export default ForgotPassword;

