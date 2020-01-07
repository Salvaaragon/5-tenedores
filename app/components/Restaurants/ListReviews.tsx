import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";

export default function ListReviews(props) {
    const { navigation, idRestaurant } = props;

    return (
        <View>
            <Button
                buttonStyle={styles.btnAddReview}
                titleStyle={styles.btnTitleAddReview}
                title="Write a review"
                icon={{
                    type: "material-community",
                    name: "square-edit-outline",
                    color: "00A680"
                }}
                onPress={() =>
                    navigation.navigate("AddReviewRestaurant", {
                        idRestaurant: idRestaurant
                    })
                }
            />
            <Text>Comment list ...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent"
    },
    btnTitleAddReview: {
        color: "#00A680"
    }
});
