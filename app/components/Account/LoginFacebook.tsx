import React from "react";
import { SocialIcon } from "react-native-elements";

export default function LoginFacebook() {
    const login = () => {
        console.log("Login with facebook");
    };

    return (
        <SocialIcon
            title="Login with facebook"
            button
            type="facebook"
            onPress={login}
        />
    );
}
