import React from "react";
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
    const { restaurants, navigation } = props;

    return (
        <View>
            <Text>ListTopRestaurants</Text>
        </View>
    );
}
