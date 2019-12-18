import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";

export default function UserLogged() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
    }, []);

    return (
        <View>
            <InfoUser userInfo={userInfo} />
            <Button title="Logout" onPress={() => firebase.auth().signOut()} />
        </View>
    );
}
