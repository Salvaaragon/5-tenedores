import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScren from "../screens/Account/Register";

const AccountScreenStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: () => ({
            title: "Login"
        })
    },
    Register: {
        screen: RegisterScren,
        navigationOptions: () => ({
            title: "Register"
        })
    }
});

export default AccountScreenStacks;
