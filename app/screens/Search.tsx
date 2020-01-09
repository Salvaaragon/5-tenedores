import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ScrollView
} from "react-native";
import { SearchBar, ListItem, Icon, Header } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";
import * as firebase from "firebase";
import { FireSQL } from "firesql";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
    const { navigation } = props;
    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    const [countResults, setCountResults] = useState(0);

    useEffect(() => {
        onSearch();
    }, [search]);

    const [onSearch] = useDebouncedCallback(() => {
        if (search) {
            fireSQL
                .query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
                .then(response => {
                    setRestaurants(response);
                    setCountResults(response.length);
                });
        } else {
            setRestaurants([]);
        }
    }, 300);

    return (
        <>
            <Header
                backgroundColor="#00A680"
                centerComponent={{
                    text: "Search restaurants",
                    style: { fontSize: 20, color: "white" }
                }}
            />
            <SearchBar
                placeholder="Search restaurant..."
                onChangeText={e => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />

            {restaurants.length === 0 ? (
                <NotFoundRestaurants />
            ) : (
                <>
                    <Text style={styles.textTotalRestaurants}>
                        {countResults > 1
                            ? "Se han encontrado " +
                              countResults +
                              " resultados"
                            : "Se ha encontrado 1 resultado"}
                    </Text>
                    <ScrollView>
                        <FlatList
                            data={restaurants}
                            renderItem={restaurant => (
                                <Restaurant
                                    restaurant={restaurant}
                                    navigation={navigation}
                                />
                            )}
                            keyExtractor={(item, idx) => idx.toString()}
                        />
                    </ScrollView>
                </>
            )}
        </>
    );
}

function Restaurant(props) {
    const { restaurant, navigation } = props;
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
            leftAvatar={{ source: { uri: imageRestaurant } }}
            rightIcon={<Icon type="material-community" name="chevron-right" />}
            onPress={() =>
                navigation.navigate("Restaurant", {
                    restaurant: restaurant.item,
                    prevSection: "Search"
                })
            }
            containerStyle={styles.restaurantContainer}
        />
    );
}

function NotFoundRestaurants() {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Image
                source={require("../../assets/img/no-result-found.png")}
                resizeMode="cover"
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20
    },
    textTotalRestaurants: {
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: "bold"
    },
    restaurantContainer: {
        backgroundColor: "#E1E1E1",
        margin: 5,
        borderRadius: 15
    }
});
