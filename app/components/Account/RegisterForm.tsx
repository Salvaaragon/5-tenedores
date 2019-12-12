import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function RegisterForm() {
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
                secureTextEntry={true}
                containerStyle={styles.input}
                onChange={() => console.log("Password changed")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="eye-outline"
                        iconStyle={styles.icon}
                    />
                }
            />
            <Input
                placeholder="Repeat password"
                secureTextEntry={true}
                containerStyle={styles.input}
                onChange={() => console.log("Repeat password changed")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="eye-outline"
                        iconStyle={styles.icon}
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
