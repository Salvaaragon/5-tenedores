import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/MyAccount";

const MyAccountScreenStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: () => ({
            title: "My account"
        })
    }
});

export default MyAccountScreenStacks;
