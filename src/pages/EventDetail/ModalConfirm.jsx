import React from 'react'

const ModalConfirm = ({confirmFunction, closeFunction, textContent}) => {
  return (
    <div className='modal'>
        <div className='modal__bloc'>
            <h3>Confirmer cette mon inscription ?</h3>
            <button onClick={confirmFunction} className='mainButton'>{textContent ? textContent : "Confirmer"}</button>
            <button onClick={closeFunction} className='scndButton'>Annuler</button>
        </div>
    </div>
  )
}

export default ModalConfirm
