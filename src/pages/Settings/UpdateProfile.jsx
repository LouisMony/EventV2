import React, { useState } from 'react'
import '../../style/StyleRegister.scss';
import GoBack from '../../components/GoBack/GoBack';
import { useAuth } from '../../context/AuthProvider';
import { supabase } from '../../supabase/client';

const UpdateProfile = () => {
  const {user} = useAuth()
  const [formData, setFormData] = useState({
    email: user.email,
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });
  const [buttonContent, setButtonContent] = useState('Modifier')
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
    setIsLoading(true)
    setButtonContent("Patientez ...")
    console.log(formData);
    
    if(formData.password !== formData.confirmPassword){
      setErrorMessage("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      setButtonContent("Modifier")
    }

    else {
      try {
        const { user, error } = await supabase.auth.updateUser({
          email: formData.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.currentPassword,
        }).select();
    
        if (error) {
          setErrorMessage(error.message);
          setIsLoading(false);
          setButtonContent("Modifier");
        } else {
          console.log("User email updated successfully");
          console.log(user);
        }
      } catch (error) {
        console.error("Error updating user email:", error.message);
        setErrorMessage("Une erreur s'est produite lors de la mise à jour de l'email.");
        setIsLoading(false);
        setButtonContent("Modifier");
      }
    }
  }

  return (
    <div className='register'>
      <GoBack link={'/settings'}/>
      <h2>Modifier mes informations</h2>
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
          <span>Mot de passe actuel</span>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Nouveau mot de passe (minimum 6 caractères)</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Confirmation du nouveau mot de passe</span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button disabled={isLoading} className='mainButton' type="submit">{buttonContent}</button>
      </form>
      {errorMessage && <p style={{ color: 'red', fontSize: "12px", marginTop: "12px" }}>{errorMessage}</p>}
    </div>
  )
}

export default UpdateProfile
