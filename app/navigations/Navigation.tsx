import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantsScreenStacks from "./RestaurantsStacks";
import TopListsScreenStacks from "./TopListsStacks";
import SearchScreenStacks from "./SearchStacks";
import MyAccountScreenStacks from "./AccountStacks";
import FavouritesScreenStacks from "./FavouritesStacks";

const NavigationStacks = createBottomTabNavigator(
    {
        Restaurants: {
            screen: RestaurantsScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Restaurants",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="material-community"
                        name="compass-outline"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        Favourites: {
            screen: FavouritesScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Favourites",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="material-community"
                        name="heart-outline"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        TopLists: {
            screen: TopListsScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Ranking",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="material-community"
                        name="star-outline"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        Search: {
            screen: SearchScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Search",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="material-community"
                        name="magnify"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        MyAccount: {
            screen: MyAccountScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "My account",
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        type="material-community"
                        name="account-outline"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        }
    },
    {
        initialRouteName: "Restaurants",
        order: ["Restaurants", "Favourites", "TopLists", "Search", "MyAccount"],
        tabBarOptions: {
            inactiveTintColor: "#646464",
            activeTintColor: "#00A680"
        }
    }
);

export default createAppContainer(NavigationStacks);
