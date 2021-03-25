import * as firebase from 'firebase';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { reauthenticate } from '../../utils/Api';

export default function ChangeEmailForm(props) {
  const { email, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState<{
    email?: string;
    newEmail?: string;
    password?: string;
  }>({});
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = () => {
    setError({});

    if (!newEmail || email === newEmail) {
      setError({ email: "Email field can't be blank or the same" });
    } else {
      setIsLoading(true);

      reauthenticate(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show('Email updated correctly');
              setIsVisibleModal(false);
            })
            .catch(() => {
              setError({ email: 'Error updating email' });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setError({ password: 'Wrong password' });
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Email"
        containerStyle={styles.input}
        defaultValue={email && email}
        onChange={(e) => setNewEmail(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#C2C2C2',
        }}
        errorMessage={error.email}
      />
      <Input
        placeholder="Password"
        containerStyle={styles.input}
        secureTextEntry={hidePassword}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hidePassword ? 'eye-outline' : 'eye-off-outline',
          color: '#C2C2C2',
          onPress: () => setHidePassword(!hidePassword),
        }}
        errorMessage={error.password}
      />
      <Button
        title="Change email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateEmail}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: '#00A680',
  },
});
