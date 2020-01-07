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
            title: props.navigation.state.params.restaurant.item.restaurant.name
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
