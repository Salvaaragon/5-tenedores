import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function InfoUser(props) {
  const {
    userInfo: { uid, displayName, email, photoURL },
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading,
  } = props;

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera == 'denied') {
      toastRef.current.show('Is required to accept gallery permissions');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show(
          'You have closed image gallery without select an image',
        );
      } else {
        uploadImage(result.uri, uid).then(() => {
          updatePhotoUrl(uid);
        });
      }
    }
  };

  const uploadImage = async (uri, imageName) => {
    setTextLoading('Updating avatar');
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${imageName}`);

    return ref.put(blob);
  };

  const updatePhotoUrl = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
        setIsLoading(false);
      })
      .catch(() => {
        toastRef.current.show('Error getting avatar from server');
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.avatarUserInfo}
        source={{
          uri: photoURL
            ? photoURL
            : 'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default-250x250.png',
        }}
      />
      <View>
        <Text style={styles.nameUser}>
          {' '}
          {displayName ? displayName : 'Nameless'}
        </Text>
        <Text>{email ? email : 'Social login'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    paddingTop: 30,
    paddingBottom: 30,
  },
  avatarUserInfo: {
    marginRight: 20,
  },
  nameUser: {
    fontWeight: 'bold',
  },
});
