import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
import React, { useState } from 'react';
import { SocialIcon } from 'react-native-elements';
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading';

export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;

  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    Facebook.initializeAsync(FacebookApi.application_id, '5 tenedores');
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      { permissions: FacebookApi.permissions },
    );

    if (type == 'success') {
      setIsLoading(true);
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          navigation.navigate('MyAccount');
        })
        .catch(() => {
          toastRef.current.show('Error login with facebook. Try again later');
        });
    } else if (type == 'cancel') {
      toastRef.current.show('Login cancelled');
    } else {
      toastRef.current.show('Unknow error. Try again later');
    }
    setIsLoading(false);
  };

  return (
    <>
      <SocialIcon
        title="Login with facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading isVisible={isLoading} text="Login" />
    </>
  );
}
