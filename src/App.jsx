//GENERAL
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

//COMP
import Home from './pages/Home';
import Account from './pages/Account';
import SignUp from './pages/Register/SignUp';
import SignIn from './pages/Register/SignIn';
import Settings from './pages/Settings';
import EventDetail from './pages/EventDetail';
import Navbar from './components/Navbar/Navbar';
import Rgpd from './pages/Settings/Rgpd';
import Admin from './pages/Admin';

//STYLE 
import './index.scss';
import { AnimatePresence } from 'framer-motion';

//JS
import { supabase } from './supabase/client';
import { getAllEvents, getAllInscriptions, getAllProfils } from './js/helpers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from './reducers/eventSlice';
import { loadInscriptions } from './reducers/inscriptionSlice';
import { loadProfils } from './reducers/profilsSlice';
import { useNavigate } from 'react-router-dom';

function App() {
  const { user } = useAuth();
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const profilsSelector = useSelector(state => state.profils.data)
  const shouldDisplayNavbar = location.pathname === '/utilisation-des-donnees' || location.pathname === '/mon-compte' || location.pathname === '/settings' || location.pathname === '/evenements';
  const [roleUser, setRoleUser] = useState('basic_user')
  
  async function globalFetch() {
    try {
      const eventLoad = await getAllEvents();
      dispatch(loadEvents(eventLoad));
      const inscriptionLoad = await getAllInscriptions();
      dispatch(loadInscriptions(inscriptionLoad));
      const profilsLoad = await getAllProfils();
      dispatch(loadProfils(profilsLoad));
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  async function getUserRole(userInfo){
    if(userInfo && profilsSelector){
      console.log(userInfo);
      const selectedUser = profilsSelector.find((user) => user.id === userInfo.id);
      setRoleUser(selectedUser)
      console.log(selectedUser);
    }
    else{
      console.log("abort");
    }
  }

  useEffect(() => {
    if (user) {
      //navigate('/evenements')
      globalFetch();
      
      const channels = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        (payload) => {
          globalFetch()
        }
      )
      .subscribe()
    }
    else{
      //navigate('/register/me-connecter')
    }
  }, [user, dispatch]);

  useEffect(() =>{
    if(user && profilsSelector) getUserRole(user)
  },[user, profilsSelector])


  return (
    <>
        {shouldDisplayNavbar && user && <Navbar/>}
        <AnimatePresence mode='wait'>
        {
          user ?
            <Routes location={location} key={location.pathname}>
              <Route path='/evenements' element={<Home/>} />
              <Route path='/mon-compte' element={<Account/>} />
              <Route path='/event/:id' element={<EventDetail/>} />
              <Route path='/settings' element={<Settings/>} />
              {roleUser.role === "admin_user" ? <Route path='/fdr-admin' element={<Admin/>} /> : null}
              <Route path='/utilisation-des-donnees' element={<Rgpd/>} />
            </Routes> 
          : 
            <Routes location={location} key={location.pathname}>
              <Route path='/register/creer-un-compte' element={<SignUp/>} />
              <Route path='/register/me-connecter' element={<SignIn/>} />
            </Routes> 
        }
        </AnimatePresence>
    </>
  );
}


export default App;

