import React from 'react'

const ModalDelete = ({confirmFunction, closeFunction}) => {
  return (
    <div className='modal'>
        <div className='modal__bloc'>
            <h3>Me désinscrire de cet événement ?</h3>
            <p>Attention, si cette évenement est complet vous perderez définitivement votre place.</p>
            <button onClick={confirmFunction} className='mainButton'>Confirmer</button>
            <button onClick={closeFunction} className='scndButton'>Annuler</button>
        </div>
    </div>
  )
}

export default ModalDelete