import React from 'react'

const ModalSignOut = ({confirmFunction, closeFunction}) => {
  return (
    <div className='modal'>
        <div className='modal__bloc'>
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <button onClick={confirmFunction} className='mainButton'>Confirmer</button>
            <button onClick={closeFunction} className='scndButton'>Annuler</button>
        </div>
    </div>
  )
}

export default ModalSignOut
