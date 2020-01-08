import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";
import * as firebase from "firebase";

export default function ListTopRestaurants(props) {
    const { navigation, restaurants } = props;

    return (
        <FlatList
            data={restaurants}
            renderItem={restaurant => (
                <Restaurant restaurant={restaurant} navigation={navigation} />
            )}
            keyExtractor={(item, idx) => idx.toString()}
        />
    );
}

function Restaurant(props) {
    const { restaurant, navigation } = props;
    const { name, description, images, rating } = restaurant.item;
    const [imageRestaurant, setImageRestaurant] = useState(null);
    const [iconColor, setIconColor] = useState("#000");

    useEffect(() => {
        const image = images[0];
        firebase
            .storage()
            .ref(`restaurant-images/${image}`)
            .getDownloadURL()
            .then(response => {
                setImageRestaurant(response);
            });
    }, []);

    useEffect(() => {
        if (restaurant.index === 0) {
            setIconColor("#EFB819");
        } else if (restaurant.index === 1) {
            setIconColor("#8A9597");
        } else if (restaurant.index === 2) {
            setIconColor("#CD7F32");
        }
    });

    return (
        <TouchableOpacity onPress={() => console.log("Go to restaurant")}>
            <Card containerStyle={styles.containerCard}>
                <Icon
                    type="material-community"
                    name="chess-queen"
                    color={iconColor}
                    size={40}
                    containerStyle={styles.containerIcon}
                />
                <Image
                    style={styles.restaurantImage}
                    resizeMode="cover"
                    source={{ uri: imageRestaurant }}
                />
                <View style={styles.titleRating}>
                    <Text style={styles.title}>{name}</Text>
                    <Rating
                        imageSize={20}
                        startingValue={rating}
                        readonly
                        style={styles.rating}
                    />
                </View>
                <Text style={styles.description}>{description}</Text>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerCard: {
        marginBottom: 10,
        borderWidth: 0
    },
    containerIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
        backgroundColor: "white",
        borderRadius: 30,
        padding: 5
    },
    restaurantImage: {
        width: "100%",
        height: 200
    },
    titleRating: {
        flexDirection: "row",
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    description: {
        color: "grey",
        marginTop: 0,
        textAlign: "justify"
    }
});
