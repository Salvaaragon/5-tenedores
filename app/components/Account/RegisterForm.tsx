import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function RegisterForm() {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, setHideRepeatPassword] = useState(true);

    const register = () => {
        console.log("User registered");
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Email"
                containerStyle={styles.input}
                onChange={() => console.log("Email changed")}
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
                secureTextEntry={hidePassword}
                containerStyle={styles.input}
                onChange={() => console.log("Password changed")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                }
            />
            <Input
                placeholder="Repeat password"
                secureTextEntry={hideRepeatPassword}
                containerStyle={styles.input}
                onChange={() => console.log("Repeat password changed")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={
                            hideRepeatPassword
                                ? "eye-outline"
                                : "eye-off-outline"
                        }
                        iconStyle={styles.icon}
                        onPress={() =>
                            setHideRepeatPassword(!hideRepeatPassword)
                        }
                    />
                }
            />
            <Button
                title="Sign up"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={register}
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
        color: "#c1c1c1"
    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%"
    },
    btnRegister: {
        backgroundColor: "#00a680"
    }
});
