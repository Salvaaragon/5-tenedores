import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import CustomCarousel from "../../components/CustomCarousel";
import * as firebase from "firebase";

const screenWidth = Dimensions.get("window").width;

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
            <CustomCarousel
                arrayImages={imagesRestaurant}
                width={screenWidth}
                height={200}
            />
        </View>
    );
}
