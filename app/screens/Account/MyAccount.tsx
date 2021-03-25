import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import firebaseApp from '../../utils/FireBase';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';

export default function MyAccount() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} text="Loading..." />;
  }

  return login ? <UserLogged /> : <UserGuest />;
}
