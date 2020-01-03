import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";

export default function Restaurant(props) {
    const { navigation } = props;
    const { restaurant } = navigation.state.params.restaurant.item;
    const [imagesRestaurant, setImagesRestaurant] = useState([]);

    useEffect(() => {
        const arrayUrls = [];

        (async () => {
            await Promise.all(
                restaurant.images.map(async idImage => {
                    await firebase
                        .storage()
                        .ref(`restaurant-images/${idImage}`)
                        .getDownloadURL()
                        .then(imageUrl => {
                            arrayUrls.push(imageUrl);
                        });
                })
            );
            setImagesRestaurant(arrayUrls);
        })();
    }, []);

    return (
        <View>
            <Text>Restaurant page</Text>
        </View>
    );
}
