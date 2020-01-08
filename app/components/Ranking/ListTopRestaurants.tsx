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

    return (
        <TouchableOpacity onPress={() => console.log("Go to restaurant")}>
            <Card containerStyle={styles.containerCard}>
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
