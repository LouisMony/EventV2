import React, { useState } from 'react'
import SettingItem from './SettingItem';
import ModalSignOut from './ModalSignOut';
import { useAuth } from '../../context/AuthProvider';

//STYLE
import '../../style/StyleSettings.scss';
import { motion } from 'framer-motion';
import { fadeOpacity, anim } from '../../js/animation';

const Settings = () => {
  const { signOut } = useAuth();

  const [showModal, setShowModal] = useState(false)

  const handleSignOut = async () =>{
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleModal = () =>{
    setShowModal(!showModal)
  }

  return (
    <motion.div {...anim(fadeOpacity)}className='settings'>
      {showModal ? <ModalSignOut confirmFunction={handleSignOut} closeFunction={toggleModal}/> : null }
      
      <h2>Paramètres</h2>

      <ul className='settings__list'>
          <SettingItem link='/mon-compte' label='Modifier mes informations' />
          <SettingItem link='/utilisation-des-donnees' label='Utilisation des données' />
          <div onClick={toggleModal}><SettingItem label='Me déconnecter' /></div>
      </ul>

      <h2>Nous contacter</h2>
      <p className='settings__contact'>
        Notre magasins est situé au 31 rue du Général Leclerc 78 000 Versailles.<br/><br/>
        Vous pouvez nous appeler au 01 39 53 30 34.<br/><br/>
        Nous écrire à <a style={{textDecoration: 'underline'}} href = "mailto: contact@lesfousduroy.fr">contact@lesfousduroy.fr</a><br/><br/>
        Nous sommes ouverts de 10h à 20h du lundi au samedi, même les jours fériés (sauf le 25 Décembre et le 1er Janvier)<br/><br/>
        Retrouvez-nous également sur Facebook <a style={{textDecoration: 'underline'}} href="https://www.facebook.com/fousduroy/?locale=fr_FR">@Les Fous du Roy</a> et Instagram <a style={{textDecoration: 'underline'}} href="https://www.instagram.com/les_fous_du_roy/">@les_fous_du_roy</a>
      </p>
    </motion.div>
  )
}

export default Settings
