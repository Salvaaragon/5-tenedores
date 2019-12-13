import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";

export default function RegisterForm() {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const register = async () => {
        if (!email || !password || !repeatPassword) {
            console.log("All fields are required");
        } else {
            if (!validateEmail(email)) {
                console.log("Wrong email");
            } else {
                if (password !== repeatPassword) {
                    console.log("Passwords are different");
                } else {
                    await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            console.log("User created correctly");
                        })
                        .catch(() => {
                            console.log(
                                "Error creating user account. Try again later"
                            );
                        });
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Email"
                containerStyle={styles.input}
                onChange={e => setEmail(e.nativeEvent.text)}
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
                onChange={e => setPassword(e.nativeEvent.text)}
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
                onChange={e => setRepeatPassword(e.nativeEvent.text)}
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
