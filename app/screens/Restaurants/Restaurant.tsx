import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { Rating } from "react-native-elements";
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
        <ScrollView style={styles.viewBody}>
            <CustomCarousel
                arrayImages={imagesRestaurant}
                width={screenWidth}
                height={200}
            />
            <RestaurantTitle
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
        </ScrollView>
    );
}

function RestaurantTitle(props) {
    const { name, description, rating } = props;

    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.restaurantName}>{name}</Text>
                <Rating
                    style={styles.restaurantRating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.restaurantDescription}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewRestaurantTitle: {
        margin: 15
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: "bold"
    },
    restaurantRating: {
        position: "absolute",
        right: 0
    },
    restaurantDescription: {
        marginTop: 5,
        color: "grey"
    }
});
