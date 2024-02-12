//GENERAL
import { Route, Routes, useLocation } from 'react-router-dom';

//COMP
import Home from './pages/Home';
import Account from './pages/Account';
import SignUp from './pages/Register/SignUp';
import SignIn from './pages/Register/SignIn';
import Settings from './pages/Settings';
import EventDetail from './pages/EventDetail';
import Navbar from './components/Navbar/Navbar';

//STYLE 
import './index.scss';

function App() {
  const location = useLocation();
  const shouldDisplayNavbar = location.pathname === '/mon-compte' || location.pathname === '/settings' || location.pathname === '/';

  return (
    <>
      {shouldDisplayNavbar && <Navbar/>}
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home/>} />
        <Route path='/mon-compte' element={<Account/>} />
        <Route path='/register/creer-un-compte' element={<SignUp/>} />
        <Route path='/register/me-connecter' element={<SignIn/>} />
        <Route path='/event/:id' element={<EventDetail/>} />
        <Route path='/settings' element={<Settings/>} />
      </Routes>
    </>
  );
}


export default App;

