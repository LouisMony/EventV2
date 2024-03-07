import React, { useState } from 'react'
import '../../style/StyleAdmin.scss';
import { useSelector } from 'react-redux';
import { formatterDate } from '../../js/helpers';
import AdminForm from './AdminForm';

const Admin = () => {

  const eventsSelector = useSelector(state => state.events.data);
  const inscriptionSelector = useSelector(state => state.inscriptions.data)

  const [eventInscriptions, setEventInscriptions] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [typeForm, setTypeForm] = useState('add')

  const handleSelectEvent = (id) =>{
    setSelectedEvent(eventsSelector.find((event) => event.id === id))
    setEventInscriptions(inscriptionSelector.filter(inscription => inscription.idEvent === id));
  }

  const toggleForm = (string) =>{
    setTypeForm(string)
    setShowForm(!showForm)
  }

  return (
    <div className='admin'>
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
                  <th>&nbsp;</th>
              </tr>
          </thead>
          <tbody>
            {eventsSelector ? eventsSelector.map((item, index) => (
                <tr className={selectedEvent.id === item.id ? 'selectedRow' : ''} key={item.id} onClick={() => handleSelectEvent(item.id)}>
                    <td>{item.name}</td>
                    <td>{formatterDate(item.date)}</td>
                    <td>{item.reservations}/{item.places}</td>
                    <td>{item.reservations}</td>
                    <td><button onClick={() => toggleForm('update')}>Modifier</button></td>
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
