import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from "react-native";
import { Image, Icon } from "react-native-elements";
import Loading from "../components/Loading";
import Toast from "react-native-easy-toast";
import { NavigationEvents } from "react-navigation";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Favourites(props) {
    const { navigation } = props;
    const [restaurants, setRestaurants] = useState([]);
    const [reloadRestaurants, setReloadRestaurants] = useState(false);
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);
    const toastRef = useRef();

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
        setReloadRestaurants(false);
    }, [reloadRestaurants]);

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
            <NavigationEvents onWillFocus={() => setReloadRestaurants(true)} />
            {restaurants ? (
                <FlatList
                    data={restaurants}
                    renderItem={restaurant => (
                        <Restaurant
                            restaurant={restaurant}
                            navigation={navigation}
                            setIsVisibleLoading={setIsVisibleLoading}
                            setReloadRestaurants={setReloadRestaurants}
                            toastRef={toastRef}
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
            <Toast ref={toastRef} position="center" opacity={0.5} />
            <Loading text="Deleting restaurant" isVisible={isVisibleLoading} />
        </View>
    );
}

function Restaurant(props) {
    const {
        restaurant,
        navigation,
        setIsVisibleLoading,
        setReloadRestaurants,
        toastRef
    } = props;
    const { id, name, images } = restaurant.item;
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

    const confirmRemoveFavourite = () => {
        Alert.alert(
            "Delete restaurant",
            "Are you sure you want to delete the restaurant from your favourites list?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: removeFavourite
                }
            ],
            { cancelable: false }
        );
    };

    const removeFavourite = () => {
        setIsVisibleLoading(true);
        db.collection("favourites")
            .where("idRestaurant", "==", id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then(response => {
                response.forEach(doc => {
                    const idFavourite = doc.id;
                    db.collection("favourites")
                        .doc(idFavourite)
                        .delete()
                        .then(() => {
                            setIsVisibleLoading(false);
                            setReloadRestaurants(true);
                            toastRef.current.show(
                                "Restaurant deleted correctly",
                                2000
                            );
                        })
                        .catch(() => {
                            toastRef.current.show(
                                "Error deleting restaurant. Try again later",
                                2000
                            );
                        });
                });
            });
    };

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
                    onPress={confirmRemoveFavourite}
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
