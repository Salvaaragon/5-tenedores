import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";

export default function UserLogged() {
    return (
        <View>
            <Text>User logged...</Text>
            <Button title="Logout" onPress={() => firebase.auth().signOut()} />
        </View>
    );
}
