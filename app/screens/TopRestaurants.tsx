import React, { useState, useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { Card, Image, Rating } from "react-native-elements";
import Toast from "react-native-easy-toast";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function TopRestaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const toastRef = useRef();

    useEffect(() => {
        (async () => {
            db.collection("restaurants")
                .orderBy("rating", "desc")
                .limit(5)
                .get()
                .then(response => {
                    const restaurantsArray = [];
                    response.forEach(doc => {
                        restaurantsArray.push(doc.data());
                    });
                    setRestaurants(restaurantsArray);
                })
                .catch(() => {
                    toastRef.current.show(
                        "Error loading ranking. Try again later",
                        2000
                    );
                });
        })();
    }, []);

    return (
        <View>
            <Text>We are on restaurants ranking</Text>
            <Toast ref={toastRef} position="center" opacity={0.5} />
        </View>
    );
}
