import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";

export default function AddReviewRestaurant(props) {
    const { navigation } = props;
    const idRestaurant = navigation.state.params.idRestaurant;
    const [rating, setRating] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const toastRef = useRef();

    const addReview = () => {
        if (rating === null) {
            toastRef.current.show("You have not set any rating");
        } else if (!title) {
            toastRef.current.show("Title is required");
        } else if (!review) {
            toastRef.current.show("Comment is required");
        } else {
            console.log("Comment sent");
        }
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
            <View style={styles.formReview}>
                <Input
                    placeholder="Title"
                    containerStyle={styles.input}
                    onChange={e => setTitle(e.nativeEvent.text)}
                />
                <Input
                    placeholder="Comment"
                    multiline={true}
                    inputContainerStyle={styles.textarea}
                    onChange={e => setReview(e.nativeEvent.text)}
                />
                <Button
                    title="Send comment"
                    onPress={addReview}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.5} />
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
    },
    formReview: {
        margin: 10,
        marginTop: 40,
        flex: 1,
        alignItems: "center"
    },
    input: {
        marginBottom: 10
    },
    textarea: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00A680"
    }
});
