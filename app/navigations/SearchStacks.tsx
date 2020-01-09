import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";

const SearchScreenStacks = createStackNavigator({
    Restaurants: {
        screen: SearchScreen,
        navigationOptions: () => ({
            header: null
        })
    }
});

export default SearchScreenStacks;
