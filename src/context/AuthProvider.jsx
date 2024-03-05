import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) => {
  supabase.auth.signInWithPassword({ email, password });
} 

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      }
      else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
        navigate('/register/me-connecter')
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;