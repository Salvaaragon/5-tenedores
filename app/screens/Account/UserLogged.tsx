import React, { useEffect, useState, useRef } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

export default function UserLogged() {
    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [textLoading, setTextLoading] = useState("");
    const toasRef = useRef();

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
        setReloadData(false);
    }, [reloadData]);

    return (
        <View>
            <InfoUser
                userInfo={userInfo}
                setReloadData={setReloadData}
                setIsLoading={setIsLoading}
                setTextLoading={setTextLoading}
            />
            <Button title="Logout" onPress={() => firebase.auth().signOut()} />
            <Toast ref={toasRef} position="center" opacity={0.5} />
            <Loading text={textLoading} isVisible={isLoading} />
        </View>
    );
}
