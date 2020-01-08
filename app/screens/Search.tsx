import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { FireSQL } from "firesql";
import firebaseApp from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
    const { navigation } = props;
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search) {
            fireSQL
                .query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
                .then(response => {
                    setRestaurants(response);
                });
        }
    }, [search]);

    return (
        <View>
            <SearchBar
                placeholder="Search restaurant..."
                onChangeText={e => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />
            {restaurants.length === 0 ? (
                <View>
                    <Text>Not found restaurants</Text>
                </View>
            ) : (
                <FlatList
                    data={restaurants}
                    renderItem={restaurant => (
                        <Restaurant restaurant={restaurant} />
                    )}
                    keyExtractor={(item, idx) => idx.toString()}
                />
            )}
        </View>
    );
}

function Restaurant(props) {
    const { restaurant } = props;
    const { name, images } = restaurant.item;
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
        <ListItem
            title={name} 
            leftAvatar={{ source: {uri: imageRestaurant}}}
            rightIcon={<Icon type="material-community" name="chevron-right"/>}
            onPress={() => console.log("Go to restaurant")}
        />
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20
    }
});