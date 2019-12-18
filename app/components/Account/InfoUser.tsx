import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
    const {
        userInfo: { uid, displayName, email, photoURL }
    } = props;

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        const resultPermissionCamera =
            resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera == "denied") {
            console.log("Is required to accept gallery permissions");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                console.log("You have closed image gallery");
            } else {
                uploadImage(result.uri, uid).then(() => {
                    console.log("Image uploaded correctly");
                    updatePhotoUrl(uid);
                });
            }
        }
    };

    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase
            .storage()
            .ref()
            .child(`avatar/${imageName}`);

        return ref.put(blob);
    };

    const updatePhotoUrl = uid => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async result => {
                const update = {
                    photoURL: result
                };
                await firebase.auth().currentUser.updateProfile(update);
            })
            .catch(() => {
                console.log("Error getting avatar from server");
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
                        : "https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default-250x250.png"
                }}
            />
            <View>
                <Text style={styles.nameUser}>
                    {" "}
                    {displayName ? displayName : "Nameless"}
                </Text>
                <Text>{email ? email : "Social login"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#F2F2F2",
        paddingTop: 30,
        paddingBottom: 30
    },
    avatarUserInfo: {
        marginRight: 20
    },
    nameUser: {
        fontWeight: "bold"
    }
});
