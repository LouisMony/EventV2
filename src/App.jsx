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

//STYLE 
import './index.scss';
import { AnimatePresence } from 'framer-motion';

//JS
import { supabase } from './supabase/client';
import { getAllEvents, getAllInscriptions } from './js/helpers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadEvents } from './reducers/eventSlice';
import { loadInscriptions } from './reducers/inscriptionSlice';

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch()
  const shouldDisplayNavbar = location.pathname === '/utilisation-des-donnees' || location.pathname === '/mon-compte' || location.pathname === '/settings' || location.pathname === '/evenements';

  async function globalFetch() {
    try {
      const eventLoad = await getAllEvents();
      dispatch(loadEvents(eventLoad));
      const inscriptionLoad = await getAllInscriptions();
      dispatch(loadInscriptions(inscriptionLoad));
    } catch (error) {
      console.error('Error loading content:', error);
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


  return (
    <>
        {shouldDisplayNavbar && user && <Navbar/>}
        <AnimatePresence mode='wait'>
        {
          user ?
            <Routes location={location} key={location.pathname}>
              <Route index path='/evenements' element={<Home/>} />
              <Route path='/mon-compte' element={<Account/>} />
              <Route path='/event/:id' element={<EventDetail/>} />
              <Route path='/settings' element={<Settings/>} />
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

