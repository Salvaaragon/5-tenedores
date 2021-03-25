import * as firebase from 'firebase';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { reauthenticate } from '../../utils/Api';

export default function ChangePasswordForm(props) {
  const { setIsVisibleModal, toastRef } = props;
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [error, setError] = useState<{
    general?: string;
    password?: string;
    newPassword?: string;
    newPasswordRepeat?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true);

  const updatePassword = () => {
    setError({});

    if (!password || !newPassword || !newPasswordRepeat) {
      let objError: {
        password?: string;
        newPassword?: string;
        newPasswordRepeat?: string;
      } = {};

      !password && (objError.password = 'Password field is required');
      !newPassword && (objError.newPassword = 'New password field is required');
      !newPasswordRepeat &&
        (objError.newPasswordRepeat = 'New password repeat field is required');
      setError(objError);
    } else {
      if (newPassword != newPasswordRepeat) {
        setError({
          newPassword: 'New password must be equal',
          newPasswordRepeat: 'New password must be equal',
        });
      } else {
        setIsLoading(true);
        reauthenticate(password)
          .then(() => {
            firebase
              .auth()
              .currentUser.updatePassword(newPassword)
              .then(() => {
                setIsLoading(false);
                toastRef.current.show('Password updated correctly');
                setIsVisibleModal(false);
              })
              .catch(() => {
                setError({
                  general: 'Error updating password',
                });
                setIsLoading(false);
              });
          })
          .catch(() => {
            setError({ password: 'Wrong password' });
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Current password"
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
      <Input
        placeholder="New password"
        containerStyle={styles.input}
        secureTextEntry={hideNewPassword}
        onChange={(e) => setNewPassword(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hideNewPassword ? 'eye-outline' : 'eye-off-outline',
          color: '#C2C2C2',
          onPress: () => setHideNewPassword(!hideNewPassword),
        }}
        errorMessage={error.newPassword}
      />
      <Input
        placeholder="Repeat new password"
        containerStyle={styles.input}
        secureTextEntry={hideNewPasswordRepeat}
        onChange={(e) => setNewPasswordRepeat(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: hideNewPasswordRepeat ? 'eye-outline' : 'eye-off-outline',
          color: '#C2C2C2',
          onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat),
        }}
        errorMessage={error.newPasswordRepeat}
      />
      <Button
        title="Change password"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updatePassword}
        loading={isLoading}
      />
      <Text>{error.general}</Text>
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
