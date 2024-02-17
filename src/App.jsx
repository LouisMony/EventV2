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

//JS
import { getAllEvents } from './js/helpers';
import { useEffect } from 'react';
import { UseDispatch, useDispatch } from 'react-redux';
import { loadEvents } from './reducers/eventSlice';

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const dispatch = useDispatch()
  const shouldDisplayNavbar = location.pathname === '/utilisation-des-donnees' || location.pathname === '/mon-compte' || location.pathname === '/settings' || location.pathname === '/evenements';

  useEffect(() => {
    if (user) {
      async function fetchEvents() {
        try {
          const eventLoad = await getAllEvents();
          dispatch(loadEvents(eventLoad));
        } catch (error) {
          console.error('Error loading content:', error);
        }
      }
      fetchEvents();
    }
  }, [user, dispatch]);

  return (
    <>
        {shouldDisplayNavbar && user && <Navbar/>}
        {
          user ?
            <Routes location={location} key={location.pathname}>
              <Route path='/evenements' element={<Home/>} />
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
    </>
  );
}


export default App;

