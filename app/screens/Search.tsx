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
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20
    }
});
