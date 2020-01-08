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
        <View>
            <Text>Restaurant</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
