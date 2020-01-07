import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function AddReviewRestaurant(props) {
    const { navigation } = props;
    const idRestaurant = navigation.state.params.idRestaurant;

    return (
        <View>
            <Text>AddReviewRestaurant...</Text>
        </View>
    );
}
