import React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";
import RestaurantScreen from "../screens/Restaurants/Restaurant";
import AddReviewRestaurantScreen from "../screens/Restaurants/AddReviewRestaurant";

const RestaurantsScreenStacks = createStackNavigator({
    Restaurants: {
        screen: RestaurantsScreen,
        navigationOptions: () => ({
            title: "Restaurants"
        })
    },
    AddRestaurant: {
        screen: AddRestaurantScreen,
        navigationOptions: () => ({
            title: "New restaurant"
        })
    },
    Restaurant: {
        screen: RestaurantScreen,
        navigationOptions: props => ({
            title: props.navigation.state.params.restaurant.name,
            headerLeft: () => (
                <Icon
                    type="material-community"
                    name="arrow-left"
                    onPress={() => {
                        props.navigation.navigate("Restaurants");
                        props.navigation.navigate(
                            props.navigation.state.params.prevSection
                        );
                    }}
                    size={25}
                    containerStyle={{ marginLeft: 10 }}
                />
            )
        })
    },
    AddReviewRestaurant: {
        screen: AddReviewRestaurantScreen,
        navigationOptions: props => ({
            title: "New comment"
        })
    }
});

export default RestaurantsScreenStacks;
