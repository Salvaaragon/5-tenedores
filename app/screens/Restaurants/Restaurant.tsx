import React from "react";
import { View, Text } from "react-native";

export default function Restaurant(props) {
    const { navigation } = props;
    const { restaurant } = navigation.state.params.restaurant.item;

    return (
        <View>
            <Text>Restaurant page</Text>
        </View>
    );
}
