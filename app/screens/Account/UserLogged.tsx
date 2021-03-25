import * as firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Button, Header } from 'react-native-elements';
import AccountOptions from '../../components/Account/AccountOptions';
import InfoUser from '../../components/Account/InfoUser';
import Loading from '../../components/Loading';

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState('');
  const toasRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View style={styles.viewUserInfo}>
      <Header
        backgroundColor="#00A680"
        centerComponent={{
          text: 'User profile',
          style: { fontSize: 20, color: 'white' },
        }}
      />
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toasRef}
      />
      <Button
        title="Logout"
        buttonStyle={styles.btnLogout}
        titleStyle={styles.btnLogoutText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toasRef} position="center" opacity={0.5} />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: '100%',
    backgroundColor: '#F2F2F2',
  },
  headerIcon: {
    borderRadius: 100,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 5,
  },
  btnLogout: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E3E3E3',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnLogoutText: {
    color: '#00A680',
  },
});
