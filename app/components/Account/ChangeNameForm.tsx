import * as firebase from 'firebase';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default function ChangeNameForm(props) {
  const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newName, setNewName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateName = () => {
    setError(null);
    if (!newName) {
      setError('Name field is not updated');
    } else {
      setIsLoading(true);
      const update = {
        displayName: newName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          toastRef.current.show('Name updated correctly');
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError('Error updating name');
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Name"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={(e) => setNewName(e.nativeEvent.text)}
        rightIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          color: '#C2C2C2',
        }}
        errorMessage={error}
      />
      <Button
        title="Change name"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={updateName}
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
    width: '100%',
  },
  btn: {
    backgroundColor: '#00A680',
  },
});
