import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";

export default function RegisterForm(props) {
    const { toastRef, navigation } = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const register = async () => {
        if (!email || !password || !repeatPassword) {
            toastRef.current.show("All field are required", 2000);
        } else {
            if (!validateEmail(email)) {
                toastRef.current.show("Email is invalid", 2000);
            } else {
                if (password !== repeatPassword) {
                    toastRef.current.show("Passwords don't match", 2000);
                } else {
                    if (password.length < 6) {
                        toastRef.current.show(
                            "Passwords must have min 6 characters",
                            2000
                        );
                    } else {
                        await firebase
                            .auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                navigation.navigate("MyAccount");
                            })
                            .catch(() => {
                                toastRef.current.show(
                                    "Error during user account creation. Try again later",
                                    2000
                                );
                            });
                    }
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
