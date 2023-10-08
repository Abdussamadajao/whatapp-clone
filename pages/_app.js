import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { FieldValue, serverTimestamp } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if(user){
            const cityRef = doc(db, 'users', user.uid);
            setDoc(cityRef, {
                email:user.email,
                lastSeen: serverTimestamp(),
                photoURL: user.photoURL,
            }, { merge: true });
        }

    }, [])


    if(loading) return <Loading />

    if(!user) return <Login />



    if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
