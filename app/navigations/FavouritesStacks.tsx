import { createStackNavigator } from "react-navigation-stack";
import FavouritesScreen from "../screens/Favourites";

const FavouritesScreenStacks = createStackNavigator({
    Favourites: {
        screen: FavouritesScreen,
        navigationOptions: () => ({
            title: "Favourite restaurants"
        })
    }
});

export default FavouritesScreenStacks;
