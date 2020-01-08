import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Toast from "react-native-easy-toast";
import ListTopRestaurants from "../components/Ranking/ListTopRestaurants";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
    const { navigation } = props;
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
        <View style={styles.viewBody}>
            <ListTopRestaurants
                restaurants={restaurants}
                navigation={navigation}
            />
            <Toast ref={toastRef} position="center" opacity={0.5} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        backgroundColor: "#EBEBEB"
    }
});
