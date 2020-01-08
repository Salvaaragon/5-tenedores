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
            header: null
        })
    },
    AddRestaurant: {
        screen: AddRestaurantScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    Restaurant: {
        screen: RestaurantScreen,
        navigationOptions: props => ({
            header: null
        })
    },
    AddReviewRestaurant: {
        screen: AddReviewRestaurantScreen,
        navigationOptions: props => ({
            header: null
        })
    }
});

export default RestaurantsScreenStacks;
