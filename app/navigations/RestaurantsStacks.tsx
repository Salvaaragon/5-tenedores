import { createStackNavigator } from 'react-navigation-stack';
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant';
import AddReviewRestaurantScreen from '../screens/Restaurants/AddReviewRestaurant';
import RestaurantScreen from '../screens/Restaurants/Restaurant';
import RestaurantsScreen from '../screens/Restaurants/Restaurants';

const RestaurantsScreenStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Restaurant: {
    screen: RestaurantScreen,
    navigationOptions: (props) => ({
      header: null,
    }),
  },
  AddReviewRestaurant: {
    screen: AddReviewRestaurantScreen,
    navigationOptions: (props) => ({
      header: null,
    }),
  },
});

export default RestaurantsScreenStacks;
