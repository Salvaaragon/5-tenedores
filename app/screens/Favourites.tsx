import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { Image } from "react-native-elements";

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
        <View>
            <Text>Favourites...</Text>
        </View>
    );
}
