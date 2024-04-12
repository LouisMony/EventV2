import React, { useState } from 'react';
import { supabase } from '../../supabase/client';
import { ToastContainer} from 'react-toastify';
import { successToast } from '../../js/helpers';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
        const { data, error } = await supabase.auth.refreshSession();
        if(data){
            const { data, error } = await supabase.auth.updateUser({
                email: formData.email,
                password: formData.password
            })
    
            if(data){
                alert('success')
                console.log(data);
                successToast("Mot de passe réinitialisé")
            }
            if(error){
                alert('error')
                console.log(error);
            }
        }
        
    } else {
      alert("Les mots de passe ne correspondent pas.");
    }
  };

  return (
    <div className='register'>
        <ToastContainer />
        <h2>Réinitialisez votre motre de passe</h2>
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
            <label>
                <span>Confirmer le mot de passe</span>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </label>
            <button className='mainButton' type="submit">Valider</button>
        </form>
    </div>
  );
};

export default ResetPassword;
