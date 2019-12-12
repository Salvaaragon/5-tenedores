import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantsScreenStacks from "./RestaurantsStacks";
import TopListsScreenStacks from "./TopListsStacks";
import SearchScreenStacks from "./SearchStacks";
import MyAccountScreenStacks from "./AccountStacks";

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
                        name="account"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        }
    },
    {
        initialRouteName: "MyAccount",
        order: ["Restaurants", "TopLists", "Search", "MyAccount"],
        tabBarOptions: {
            inactiveTintColor: "#646464",
            activeTintColor: "#00A680"
        }
    }
);

export default createAppContainer(NavigationStacks);
