import React from 'react'

const EventBloc = () => {
  return (
    <div className='eventBloc'>
      <div className='eventBloc__img'>
        <img src="https://images.unsplash.com/photo-1707638121258-eb6241971802?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Evenement" />
      </div>
      <div className='eventBloc__main'>
        <span className='eventBloc__main__title'>Draft - Edition #45</span>
        <span>Magic the Gathering</span>
        <span>6 février 2023</span>
      </div>
      <div className='eventBloc__end'>
        <img src="./media/img/arrow_right.svg" alt="Voir le détail" />
        <p>
            <span className='count'>6 / 15</span>
            <span>Participants</span>
        </p>
      </div>
    </div>
  )
}

export default EventBloc
