import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";

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
    }
});

export default RestaurantsScreenStacks;
