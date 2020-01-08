import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import * as firebase from "firebase";

export default function Search(props) {
    const { navigation } = props;
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState("");

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
