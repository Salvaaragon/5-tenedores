import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Header, Icon } from "react-native-elements";
import ActionButton from "react-native-action-button";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
    const { navigation } = props;
    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [startRestaurant, setStartRestaurant] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [isReloadRestaurants, setIsReloadRestaurants] = useState(false);
    const limitRestaurants = 10;

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        db.collection("restaurants")
            .get()
            .then(snap => {
                setTotalRestaurants(snap.size);
            });

        (async () => {
            const resultRestaurants = [];

            const restaurants = db
                .collection("restaurants")
                .orderBy("createAt", "desc")
                .limit(limitRestaurants);

            await restaurants.get().then(response => {
                setStartRestaurant(response.docs[response.docs.length - 1]);

                response.forEach(doc => {
                    let restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push({ restaurant });
                });

                setRestaurants(resultRestaurants);
            });
        })();
        setIsReloadRestaurants(false);
    }, [isReloadRestaurants]);

    const handleLoadMore = async () => {
        const resultRestaurants = [];
        restaurants.length < totalRestaurants && setIsLoading(true);

        const restaurantsDB = db
            .collection("restaurants")
            .orderBy("createAt", "desc")
            .startAfter(startRestaurant.data().createAt)
            .limit(limitRestaurants);

        await restaurantsDB.get().then(response => {
            if (response.docs.length > 0) {
                setStartRestaurant(response.docs[response.docs.length - 1]);
            } else {
                setIsLoading(false);
            }

            response.forEach(doc => {
                let restaurant = doc.data();
                restaurant.id = doc.id;
                resultRestaurants.push({ restaurant });
            });

            setRestaurants([...restaurants, ...resultRestaurants]);
        });
    };

    return (
        <View style={styles.viewBody}>
            <Header
                backgroundColor="#00A680"
                centerComponent={{
                    text: "Restaurants",
                    style: { fontSize: 20, color: "white" }
                }}
            />
            <ListRestaurants
                restaurants={restaurants}
                isLoading={isLoading}
                handleLoadMore={handleLoadMore}
                navigation={navigation}
            />
            {user && (
                <AddRestaurantButton
                    navigation={navigation}
                    setIsReloadRestaurants={setIsReloadRestaurants}
                />
            )}
        </View>
    );
}

function AddRestaurantButton(props) {
    const { navigation, setIsReloadRestaurants } = props;
    return (
        <ActionButton
            buttonColor="#00A680"
            onPress={() =>
                navigation.navigate("AddRestaurant", { setIsReloadRestaurants })
            }
        />
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    headerIcon: {
        borderRadius: 100,
        borderColor: "white",
        borderStyle: "solid",
        borderWidth: 2,
        padding: 5
    }
});
