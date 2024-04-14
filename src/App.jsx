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
import UpdateProfile from './pages/Settings/UpdateProfile';
import ForgotPassword from './pages/ResetPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

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
  const shouldDisplayNavbar = location.pathname === '/utilisation-des-donnees' || location.pathname === '/mon-compte' || location.pathname === '/settings' || location.pathname === '/' || location.pathname === '/fdr-admin';
  const [roleUser, setRoleUser] = useState('basic_user')
  const [desiredRoute, setDesiredRoute] = useState(null)
  
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
      const selectedUser = profilsSelector.find((user) => user.id === userInfo.id);
      setRoleUser(selectedUser)
    }
  }

  useEffect(() => {
    if (user) {
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
  }, [user, dispatch]);

  useEffect(() =>{
    if(user && profilsSelector) getUserRole(user)
  },[user, profilsSelector])

  useEffect(() => {
    if (user) {
      if (location.pathname === '/register/me-connecter' || location.pathname === '/register/creer-un-compte') {
        if(desiredRoute){
          navigate(desiredRoute)
        }
        else{
          navigate('/')
        }
      }
    }
    else{
      if (location.pathname !== '/register/me-connecter' && location.pathname !== '/register/creer-un-compte' && location.pathname !== '/register/forget-password') {
        setDesiredRoute(location.pathname)
        navigate('/register/me-connecter')
      }      
    }
  }, [user, location]);

  useEffect(() => {
    console.log('desired', desiredRoute);;
  }, [desiredRoute]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
        {shouldDisplayNavbar && user && <Navbar/>}
        <AnimatePresence mode='wait'>
        {
          user ?
            <Routes location={location} key={location.pathname}>
              <Route index path='/' element={<Home/>} />
              <Route path='/mon-compte' element={<Account/>} />
              <Route path='/event/:id' element={<EventDetail/>} />
              <Route path='/settings' element={<Settings/>} />
              {roleUser.role === "admin_user" ? <Route path='/fdr-admin' element={<Admin/>} /> : null}
              <Route path='/utilisation-des-donnees' element={<Rgpd/>} />
              <Route path='/modifier-mes-informations' element={<UpdateProfile/>} />
              <Route path='/register/forget-password' element={<ForgotPassword/>} />
              <Route path='/register/reset-password' element={<ResetPassword/>} />
            </Routes> 
          : 
            <Routes location={location} key={location.pathname}>
              <Route path='/register/creer-un-compte' element={<SignUp/>} />
              <Route path='/register/me-connecter' element={<SignIn/>} />
              <Route path='/register/forget-password' element={<ForgotPassword/>} />
            </Routes> 
        }
        </AnimatePresence>
    </>
  );
}


export default App;

