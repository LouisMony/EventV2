import React from 'react'

const ModalEmail = ({closeFunction}) => {
  return (
    <div className='modal'>
        <div className='modal__bloc'>
            <h3>Félicitation votre compte a été crée !</h3>
            <p>Pour activer votre compte, rendez vous dans votre boîte mail, un message de confirmation vous a été envoyé. </p>
            <button onClick={closeFunction} className='scndButton'>Fermer</button>
        </div>
    </div>
  )
}

export default ModalEmail
