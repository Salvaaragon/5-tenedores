import * as firebase from 'firebase';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { validateEmail } from '../../utils/Validation';
import Loading from '../Loading';

function LoginForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const login = async () => {
    setIsVisibleLoading(false);
    if (!email || !password) {
      toastRef.current.show('All fields are required');
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show('Wrong email');
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate('MyAccount');
          })
          .catch(() => {
            toastRef.current.show('Wrong email or password');
          });
      }
    }
    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        containerStyle={styles.input}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Input
        placeholder="Password"
        containerStyle={styles.input}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        secureTextEntry={hidePassword}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={styles.icon}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="Login"
        containerStyle={styles.containerBtn}
        buttonStyle={styles.btn}
        onPress={login}
      />
      <Loading isVisible={isVisibleLoading} text="Login user..." />
    </View>
  );
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  input: {
    width: '100%',
    marginTop: 20,
  },
  icon: {
    color: '#C1C1C1',
  },
  containerBtn: {
    marginTop: 20,
    width: '95%',
  },
  btn: {
    backgroundColor: '#00a680',
  },
});
