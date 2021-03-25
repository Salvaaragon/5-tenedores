import React, { useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Header } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import RegisterForm from '../../components/Account/RegisterForm';

export default function Register(props) {
  const { navigation } = props;
  const toastRef = useRef<Toast>();
  return (
    <>
      <Header
        backgroundColor="#00A680"
        centerComponent={{
          text: 'Register',
          style: { fontSize: 20, color: 'white' },
        }}
      />
      <KeyboardAwareScrollView>
        <Image
          source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.form}>
          <RegisterForm toastRef={toastRef} navigation={navigation} />
        </View>
      </KeyboardAwareScrollView>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    borderRadius: 100,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 5,
  },
  logo: {
    width: '100%',
    height: 150,
    marginTop: 20,
  },
  form: {
    marginRight: 40,
    marginLeft: 40,
  },
});
