import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { withNavigation } from "react-navigation";

export default function Login() {
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.container}>
                <Text>Form Login...</Text>
                <Text>Create Account...</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.container}>
                <Text>LoginFacebook</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 250,
        marginTop: 20
    },
    container: {
        marginRight: 40,
        marginLeft: 40
    },
    divider: {
        backgroundColor: "#006a80",
        margin: 40
    }
});
