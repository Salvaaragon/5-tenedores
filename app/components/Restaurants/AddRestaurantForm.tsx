import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const WidthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
    const { toastRef, setIsLoading, navigation } = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");

    return (
        <ScrollView>
            <ImageRestaurant imageRestaurant={imagesSelected[0]} />
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurantDescription={setRestaurantDescription}
            />
            <UploadImage
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
                toastRef={toastRef}
            />
        </ScrollView>
    );
}

function ImageRestaurant(props) {
    const { imageRestaurant } = props;

    return (
        <View style={styles.viewPhoto}>
            {imageRestaurant ? (
                <Image
                    source={{ uri: imageRestaurant }}
                    style={{ width: WidthScreen, height: 200 }}
                />
            ) : (
                <Image
                    source={require("../../../assets/img/no-image.png")}
                    style={{ width: WidthScreen, height: 200 }}
                />
            )}
        </View>
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

function FormAdd(props) {
    const {
        setRestaurantName,
        setRestaurantAddress,
        setRestaurantDescription
    } = props;
    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Restaurant name"
                containerStyle={styles.input}
                onChange={e => setRestaurantName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Address"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: "#C2C2C2",
                    onPress: () => {}
                }}
                onChange={e => setRestaurantAddress(e.nativeEvent.text)}
            />
            <Input
                placeholder="Restaurant description"
                multiline={true}
                containerStyle={styles.textArea}
                onChange={e => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
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
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    }
});
