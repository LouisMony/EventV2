import React from 'react'
import '../../style/StyleAdmin.scss';
import { useSelector } from 'react-redux';
import { formatterDate } from '../../js/helpers';

const Admin = () => {
  const eventsSelector = useSelector(state => state.events.data);

  return (
    <div className='admin'>
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
                <tr>
                    <td>{item.name}</td>
                    <td>{formatterDate(item.date)}</td>
                    <td>{item.reservations}/{item.places}</td>
                    <td>{item.reservations}</td>
                    <td><button className='mainButton'>Modifier</button></td>
                </tr>
              )) :
                <span className="loader"></span>
            }
              
          </tbody>
      </table>
    </div>
  )
}

export default Admin
