import React, { useState } from 'react'
import '../../style/StyleRegister.scss';
import GoBack from '../../components/GoBack/GoBack';
import { useAuth } from '../../context/AuthProvider';

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

    else{
      
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
            required
          />
        </label>

        <label>
          <span>Confirmation du nouveau mot de passe</span>
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
    </div>
  )
}

export default UpdateProfile
