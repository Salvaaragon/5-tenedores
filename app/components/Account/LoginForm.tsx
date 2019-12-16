import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Login from "../../screens/Account/Login";

export default function LoginForm() {
    const [hidePassword, setHidePassword] = useState(true);

    const login = () => {
        console.log("Logged user");
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Email"
                containerStyle={styles.input}
                onChange={() => console.log("Email updated")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.icon}
                    />
                }
            />
            <Input
                placeholder="Password"
                containerStyle={styles.input}
                onChange={() => console.log("Password updated")}
                secureTextEntry={hidePassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                }
            />
            <Button
                title="Login"
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btn}
                onPress={login}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input: {
        width: "100%",
        marginTop: 20
    },
    icon: {
        color: "#C1C1C1"
    },
    containerBtn: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00a680"
    }
});
