import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { Rating, Icon, ListItem } from "react-native-elements";
import CustomCarousel from "../../components/CustomCarousel";
import Map from "../../components/Map";
import ListReviews from "../../components/Restaurants/ListReviews";
import Toast from "react-native-easy-toast";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
    const { navigation } = props;
    const { restaurant } = navigation.state.params.restaurant.item;
    const [imagesRestaurant, setImagesRestaurant] = useState([]);
    const [rating, setRating] = useState(restaurant.rating);
    const [isFavourite, setIsFavourite] = useState(false);
    const toastRef = useRef();

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

    useEffect(() => {
        db.collection("favourites")
            .where("idRestaurant", "==", restaurant.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then(response => {
                if (response.docs.length === 1) {
                    setIsFavourite(true);
                }
            });
    }, []);

    const addFavourite = () => {
        const payload = {
            idUser: firebase.auth().currentUser.uid,
            idRestaurant: restaurant.id
        };

        db.collection("favourites")
            .add(payload)
            .then(() => {
                setIsFavourite(true);
                toastRef.current.show(
                    "Restaurant added to your favourites list",
                    2000
                );
            })
            .catch(() => {
                toastRef.current.show(
                    "Error adding restaurant to your favourites list. Try again later",
                    2000
                );
            });
    };

    const removeFavourite = () => {
        setIsFavourite(false);
    };

    return (
        <ScrollView style={styles.viewBody}>
            <View style={styles.viewFavourites}>
                <Icon
                    type="material-community"
                    name="heart"
                    onPress={isFavourite ? removeFavourite : addFavourite}
                    color={isFavourite ? "#00A680" : "#C2C2C2"}
                    size={35}
                    underlayColor="transparent"
                />
            </View>
            <CustomCarousel
                arrayImages={imagesRestaurant}
                width={screenWidth}
                height={200}
            />
            <RestaurantTitle
                name={restaurant.name}
                description={restaurant.description}
                rating={rating}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                address={restaurant.address}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
                setRating={setRating}
            />
            <Toast ref={toastRef} position="center" opacity={0.5} />
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

function RestaurantInfo(props) {
    const { location, name, address } = props;

    const listInfo = [
        {
            text: address,
            iconName: "map-marker",
            iconType: "material-community",
            action: null
        }
    ];

    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
                Restaurant information
            </Text>
            <Map location={location} name={name} height={100} />
            {listInfo.map((item, idx) => (
                <ListItem
                    key={idx}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00A680"
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewFavourites: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#FFF",
        borderBottomLeftRadius: 35,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 5
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
    },
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 25
    },
    restaurantInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    containerListItem: {
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1
    }
});
