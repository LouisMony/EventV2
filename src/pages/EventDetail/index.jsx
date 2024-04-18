import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthProvider';
import { subscribeEvent, unsubscribeEvent, successToast, errorToast } from '../../js/helpers';
import { Link, useNavigate } from 'react-router-dom';
//STYLE
import '../../style/StyleEventDetails.scss';
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';
import { fadeOpacity, anim } from '../../js/animation';

//COMP
import Info from './Info';
import ModalConfirm from './ModalConfirm';
import ModalDelete from './ModalDelete';
import GoBack from '../../components/GoBack/GoBack';
import { ToastContainer} from 'react-toastify';

//IMG
import iconArrow from '../../assets/arrow_left.svg'

const EventDetail = () => {
  const {user} = useAuth()
  const params = useParams()
  const history = useNavigate();

  const [eventInfo, setEventInfo] = useState(null)
  const [inscriptionInfo, setInscriptionInfo] = useState(null)
  const [buttonText, setButtonText] = useState("M'inscrire à cet évènement")
  const [buttonScndText, setButtonScndText] = useState("Me désinscrire de cet évènement")
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [textConfirmState, setTextConfirmState] = useState("Confirmer")

  const toggleModal = () =>{
    setShowModal(!showModal)
  }

  const toggleModalDelete = () =>{
    setShowModalDelete(!showModalDelete)
  }

  const eventsSelector = useSelector(state => state.events.data)
  const inscriptionSelector = useSelector(state => state.inscriptions.data)

  const goBack = () => {
    history.goBack();
  };

  const handleSubscribe = async () => {
    setTextConfirmState("Patientez ...");
    
    try {
        const data = await subscribeEvent(user.id, user.email, eventInfo);
        if (data.data[0].id) {
            toggleModal();
            successToast("Inscription enregistrée !");
            setTextConfirmState("Confirmez");
        }
    } catch (error) {
        setTextConfirmState("Confirmez");
        toggleModal();
        errorToast('Une erreur est survenue, merci de réassayez ultèrieurement.')
        console.error("Une erreur est survenue lors de la souscription :", error);
    }
};

  const handleUnsubscribe = async () =>{
    setTextConfirmState("Patientez ...");
    try {
        const data = await unsubscribeEvent(inscriptionInfo, eventInfo)
        if(data){
          toggleModalDelete()
          successToast("Désinscription enregistrée !")
        }
    } catch (error) {
        setTextConfirmState("Confirmez");
        toggleModal();
        errorToast('Une erreur est survenue, merci de réassayez ultèrieurement.')
    }
  }

  
  useEffect(() =>{
    if(eventsSelector){
      const selectedEvent = eventsSelector.find((event) => event.id === params.id);
      if (selectedEvent) {setEventInfo(selectedEvent)}
    }
    if(eventsSelector && inscriptionSelector){
      const selectedInscription = inscriptionSelector.find((item) => {
        return item.idEvent === params.id && item.idUser === user.id;
      });
      if (selectedInscription) {setInscriptionInfo(selectedInscription)}
    }
  },[eventsSelector, inscriptionSelector])

  useEffect(() =>{

    if(inscriptionInfo){
      setButtonIsDisabled(true)
      if(inscriptionInfo.isOnWaitingList){setButtonText("Inscris dans la file d'attente")}
      if(!inscriptionInfo.isOnWaitingList){setButtonText("Inscris à cet évenement")}
    }
    else{setButtonIsDisabled(false)}
    
  },[inscriptionInfo])



  return (
    <>
    {
      eventInfo ?
        <motion.div {...anim(fadeOpacity)} className='eventDetail'>
          <ToastContainer />
          {showModalDelete ? <ModalDelete confirmFunction={handleUnsubscribe} closeFunction={toggleModalDelete} textContent={textConfirmState}/> : null }
          {showModal ? <ModalConfirm confirmFunction={handleSubscribe} closeFunction={toggleModal} textContent={textConfirmState}/> : null }
          <div className='eventDetail__banner' style={{ backgroundImage: `url(${eventInfo.image_link})` }}>
            <GoBack link="/"/>
          </div>
          <div className='eventDetail__content'>
            <div className='eventDetail__content__title'>
              <h2>{eventInfo.name}</h2>
              <h3>{eventInfo.category}</h3>
            </div>
            <Info data={eventInfo}/>
            <p>
              <span>Détails :</span><br/>
              {eventInfo.description}
            </p>
           
            {((eventInfo.places === eventInfo.reservations) || eventInfo.isFull) && !inscriptionInfo ? 
              <p className='alert'>Cet événement est actuellement complet, vous pouvez cependant vous inscrire dans la file d’attente : en cas de désistement d’un participant vous pourriez être recontacter par notre équipe pour pouvoir participer.</p> 
            : null}
              
            <div className='eventDetail__content__action'>
              <button disabled={buttonIsDisabled} onClick={toggleModal} className='mainButton'>{buttonText}</button>
              {inscriptionInfo ? <button onClick={toggleModalDelete} className='thirdButton'>{buttonScndText}</button> : null}
            </div>
          </div>
          
        </motion.div>
      : <span className='loader'></span>
    }
    </>
    
  )
}

export default EventDetail
