import React, { useState } from 'react'
import '../../style/StyleAdmin.scss';
import { useSelector } from 'react-redux';
import { formatterDate, successToast } from '../../js/helpers';
import AdminForm from './AdminForm';
import { handleDeleteEvent } from './helper';
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AdminConfirmDelete from './AdminConfirmDelete';

const Admin = () => {

  const eventsSelector = useSelector(state => state.events.data);
  const inscriptionSelector = useSelector(state => state.inscriptions.data)

  const [eventInscriptions, setEventInscriptions] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedEventToDeleteId, setSelectedEventToDeleteId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showAdminConfirmDelete, setShowAdminConfirmDelete] = useState(false)
  const [typeForm, setTypeForm] = useState('add')

  const handleSelectEvent = (id) =>{
    setSelectedEvent(eventsSelector.find((event) => event.id === id))
    setEventInscriptions(inscriptionSelector.filter(inscription => inscription.idEvent === id));
  }

  const toggleForm = (string) =>{
    setTypeForm(string)
    setShowForm(!showForm)
  }

  const toggleConfirmDelete = (id) =>{
    setSelectedEventToDeleteId(id)
    setShowAdminConfirmDelete(!showAdminConfirmDelete)
  }

  const confirmDelete = async () =>{
    const isDeleted = await handleDeleteEvent(selectedEventToDeleteId)
    if(isDeleted){
      successToast('Évènement supprimé avec succès !')
      setShowAdminConfirmDelete(!showAdminConfirmDelete)
    }
  }

  const copyLinkEvent = (id) => {
    const link = "http://localhost:3000/event/" + id;
    navigator.clipboard.writeText(link)
      .then(() => {
          console.log('Lien copié avec succès !');
          successToast('Lien copié avec succès !')
          
      })
      .catch((err) => {
          console.error('Une erreur s\'est produite lors de la copie du lien : ', err);
      });
  }

  return (
    <div className='admin'>
      <ToastContainer />
      {showAdminConfirmDelete && <AdminConfirmDelete confirmFunction={confirmDelete} closeFunction={toggleConfirmDelete}/>}
      {showForm && <AdminForm selectedEvent={selectedEvent} type={typeForm} closeForm={toggleForm} />}

      <button className='admin_add' onClick={() => toggleForm('add')}>Ajouter un évènement</button>

      <h1>Tous les évenements</h1>
      <table>
          <thead>
              <tr>
                  <th>Nom de l’évenenement</th>
                  <th>Date</th>
                  <th>Inscriptions</th>
                  <th>File d'attente</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {eventsSelector ? eventsSelector.map((item, index) => (
                <tr className={selectedEvent && selectedEvent.id === item.id ? 'selectedRow' : ''} key={item.id} onClick={() => handleSelectEvent(item.id)}>
                    <td>{item.name}</td>
                    <td>{formatterDate(item.date)}</td>
                    <td>{item.reservations}/{item.places}</td>
                    <td>{item.waiting}</td>
                    <td className='tdAction'>
                      <button onClick={() => toggleForm('update')}>Modifier</button>
                      <button onClick={() => toggleConfirmDelete(item.id)}>Supprimer</button>
                      <button onClick={() => copyLinkEvent(item.id)}>Copier le lien</button>
                    </td>
                </tr>
              )) :
                <span className="loader"></span>
            }        
          </tbody>
      </table>
      
      {eventInscriptions && eventInscriptions.length > 0 && <h1>Liste des inscriptions : </h1>}
      {inscriptionSelector && eventInscriptions && eventInscriptions.length > 0 && <table>
          <thead>
              <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>État</th>
              </tr>
          </thead>
          <tbody>
            {inscriptionSelector && eventInscriptions ? eventInscriptions.map((item, index) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.mailUser}</td>
                    <td>{item.isOnWaitingList ? "Fil d'attente" : "Inscrit"}</td>
                </tr>
              )) :
                <span className="loader"></span>
            }
              
          </tbody>
      </table>}

    </div>
  )
}

export default Admin
