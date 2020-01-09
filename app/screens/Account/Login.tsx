import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider, Header } from "react-native-elements";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Login(props) {
    const { navigation } = props;
    const toastRef = useRef();

    return (
        <>
            <Header
                backgroundColor="#00A680"
                centerComponent={{
                    text: "User profile",
                    style: { fontSize: 20, color: "white" }
                }}
            />
            <ScrollView>
                <Image
                    source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.container}>
                    <LoginForm toastRef={toastRef} />
                    <CreateAccount navigation={navigation} />
                </View>
                <Divider style={styles.divider} />
                <View style={styles.container}>
                    <LoginFacebook
                        toastRef={toastRef}
                        navigation={navigation}
                    />
                </View>
                <Toast ref={toastRef} position="center" opacity={0.5} />
            </ScrollView>
        </>
    );
}

function CreateAccount(props) {
    const { navigation } = props;

    return (
        <Text style={styles.textRegister}>
            You haven't got account yet?{" "}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("Register")}
            >
                Register
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    headerIcon: {
        borderRadius: 100,
        borderColor: "white",
        borderStyle: "solid",
        borderWidth: 2,
        padding: 5
    },
    logo: {
        width: "100%",
        height: 180,
        marginTop: 20
    },
    container: {
        marginRight: 40,
        marginLeft: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold"
    },
    divider: {
        backgroundColor: "#00a680",
        marginTop: 20,
        marginRight: 40,
        marginBottom: 20,
        marginLeft: 40
    }
});
