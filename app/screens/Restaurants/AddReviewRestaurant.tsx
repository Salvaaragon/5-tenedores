import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AirbnbRating, Button } from "react-native-elements";

export default function AddReviewRestaurant(props) {
    const { navigation } = props;
    const idRestaurant = navigation.state.params.idRestaurant;
    const [rating, setRating] = useState(null);

    const addReview = () => {
        console.log(rating);
    };

    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    defaultRating={0}
                    size={30}
                    onFinishRating={value => setRating(value)}
                />
            </View>
            <View>
                <Button title="Send comment" onPress={addReview} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewRating: {
        height: 110,
        backgroundColor: "#F2F2F2"
    }
});
