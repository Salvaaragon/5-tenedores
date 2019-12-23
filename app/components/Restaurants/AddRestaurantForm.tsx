import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddRestaurantForm(props) {
    const { toastRef, setIsLoading, navigation } = props;
    const [imagesSelected, setImagesSelected] = useState([]);

    return (
        <ScrollView>
            <UploadImage
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                toastRef={toastRef}
            />
        </ScrollView>
    );
}

function UploadImage(props) {
    const { imagesSelected, setImagesSelected, toastRef } = props;

    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        const resultPermissionCamera =
            resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera === "denied") {
            toastRef.current.show(
                "You need to accept gallery permissions",
                3000
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                toastRef.current.show(
                    "You have closed image gallery without select an image",
                    2000
                );
            } else {
                setImagesSelected([...imagesSelected, result.uri]);
            }
        }
    };

    const imageRemove = image => {
        const arrayImages = imagesSelected;

        Alert.alert(
            "Delete image",
            "Are you sure you want to delete this image?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () =>
                        setImagesSelected(
                            arrayImages.filter(imageUrl => imageUrl !== image)
                        )
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.viewImages}>
            {imagesSelected.length < 5 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7A7A7A"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
            {imagesSelected.map((imageRestaurant, idx) => (
                <Avatar
                    key={idx}
                    onPress={() => imageRemove(imageRestaurant)}
                    style={styles.miniatureStyle}
                    source={{ uri: imageRestaurant }}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#E3E3E3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    }
});
