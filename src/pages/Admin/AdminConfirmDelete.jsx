import React from 'react'

const AdminConfirmDelete = ({confirmFunction, closeFunction}) => {
  return (
    <div className='admin_delete'>
        <div className='admin_delete__modal'>
            <span>Souhaitez-vous réellement supprimer cet événement ? Cette action est irréversible, toutes les inscriptions à cet événement seront également perdues.</span>
            <button className='mainButton' onClick={confirmFunction}>Confirmer</button>
            <button className='scndButton' onClick={closeFunction}>Annuler</button>
        </div>
    </div>
  )
}

export default AdminConfirmDelete
