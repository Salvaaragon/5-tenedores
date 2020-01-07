import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ListReviews(props) {
    const { navigation, idRestaurant, setRating } = props;
    const [reviews, setReviews] = useState([]);
    const [reviewsReload, setReviewsReload] = useState(false);

    useEffect(() => {
        (async () => {
            const resultReviews = [];
            const arrayRating = [];

            db.collection("reviews")
                .where("idRestaurant", "==", idRestaurant)
                .get()
                .then(response => {
                    response.forEach(doc => {
                        resultReviews.push(doc.data());
                        arrayRating.push(doc.data().rating);
                    });

                    let numSum = 0;
                    arrayRating.map(value => {
                        numSum = numSum + value;
                    });

                    const countRating = arrayRating.length;
                    const resultRating = numSum / countRating;
                    const resultRatingFinish = resultRating ? resultRating : 0;

                    setReviews(resultReviews);
                    setRating(resultRatingFinish);
                });

            setReviewsReload(false);
        })();
    }, [reviewsReload]);

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
                        idRestaurant: idRestaurant,
                        setReviewsReload: setReviewsReload
                    })
                }
            />
            <FlatList
                data={reviews}
                renderItem={review => (
                    <Review
                        review={review}
                        keyExtractor={(item, idx) => idx.toString()}
                    />
                )}
            />
        </View>
    );
}

function Review(props) {
    const { title, review, rating, createAt, avatarUser } = props.review.item;
    const createReview = new Date(createAt.seconds * 1000);

    return (
        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatar}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={{
                        uri: avatarUser
                            ? avatarUser
                            : "https://my.tokyotreat.com/assets/customer/default-avatar-cddb3373e5244201873f6141dbc8bf587710b5f7a3b0e4f1b890c4e4dd8cdcaf.png"
                    }}
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating imageSize={15} startingValue={rating} readonly />
                <Text style={styles.reviewDate}>
                    {createReview.getMonth() + 1}/{createReview.getDate()}/
                    {createReview.getFullYear()} - {createReview.getHours()}:
                    {createReview.getMinutes() < 10 ? "0" : ""}
                    {createReview.getMinutes()}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent"
    },
    btnTitleAddReview: {
        color: "#00A680"
    },
    viewReview: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 20,
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1
    },
    viewImageAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle: {
        fontWeight: "bold"
    },
    reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5
    },
    reviewDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }
});
