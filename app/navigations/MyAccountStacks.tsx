import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";

const MyAccountScreenStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: () => ({
            title: "My account"
        })
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: () => ({
            title: "Login"
        })
    }
});

export default MyAccountScreenStacks;
