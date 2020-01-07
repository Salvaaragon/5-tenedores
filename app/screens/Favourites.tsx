import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { Image, Icon } from "react-native-elements";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Favourites(props) {
    const { navigation } = props;
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const idUser = firebase.auth().currentUser.uid;
        db.collection("favourites")
            .where("idUser", "==", idUser)
            .get()
            .then(response => {
                const idRestaurantsArray = [];
                response.forEach(doc => {
                    idRestaurantsArray.push(doc.data().idRestaurant);
                });

                getDataRestaurant(idRestaurantsArray).then(response => {
                    const restaurants = [];
                    response.forEach(doc => {
                        let restaurant = doc.data();
                        restaurant.id = doc.id;
                        restaurants.push(restaurant);
                    });
                    setRestaurants(restaurants);
                });
            });
    }, []);

    const getDataRestaurant = idRestaurantsArray => {
        const arrayRestaurants = [];
        idRestaurantsArray.forEach(idRestaurant => {
            const result = db
                .collection("restaurants")
                .doc(idRestaurant)
                .get();
            arrayRestaurants.push(result);
        });
        return Promise.all(arrayRestaurants);
    };

    return (
        <View style={styles.viewBody}>
            {restaurants ? (
                <FlatList
                    data={restaurants}
                    renderItem={restaurant => (
                        <Restaurant
                            restaurant={restaurant}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item, idx) => idx.toString()}
                />
            ) : (
                <View style={styles.loaderRestaurants}>
                    <ActivityIndicator size="large" />
                    <Text>Loading restaurants</Text>
                </View>
            )}
        </View>
    );
}

function Restaurant(props) {
    const { restaurant, navigation } = props;
    const { name, images } = restaurant.item;
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
        <View style={styles.restaurant}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("Restaurant", {
                        restaurant: restaurant.item
                    })
                }
            >
                <Image
                    resizeMode="cover"
                    source={{
                        uri: imageRestaurant
                    }}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator color={"FFF"} />}
                />
            </TouchableOpacity>
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Icon
                    type="material-community"
                    name="heart"
                    color="#00A680"
                    containerStyle={styles.favourite}
                    onPress={() => console.log("Delete from favourites")}
                    size={40}
                    underlayColor="transparent"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#F2F2F2"
    },
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10
    },
    restaurant: {
        margin: 10
    },
    image: {
        width: "100%",
        height: 180
    },
    info: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: "#FFF"
    },
    name: {
        fontWeight: "bold",
        fontSize: 25
    },
    favourite: {
        marginTop: -35,
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 100
    }
});
