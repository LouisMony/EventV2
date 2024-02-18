import React from 'react'

const ModalConfirm = ({confirmFunction, closeFunction}) => {
  return (
    <div className='modal'>
        <div className='modal__bloc'>
            <h3>Confirmer cette mon inscription ?</h3>
            <button onClick={confirmFunction} className='mainButton'>Confirmer</button>
            <button onClick={closeFunction} className='scndButton'>Annuler</button>
        </div>
    </div>
  )
}

export default ModalConfirm
