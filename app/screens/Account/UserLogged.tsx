import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOptions";

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
        <View style={styles.viewUserInfo}>
            <InfoUser
                userInfo={userInfo}
                setReloadData={setReloadData}
                setIsLoading={setIsLoading}
                setTextLoading={setTextLoading}
            />
            <AccountOptions
                userInfo={userInfo}
                setReloadData={setReloadData}
                toastRef={toasRef}
            />
            <Button
                title="Logout"
                buttonStyle={styles.btnLogout}
                titleStyle={styles.btnLogoutText}
                onPress={() => firebase.auth().signOut()}
            />
            <Toast ref={toasRef} position="center" opacity={0.5} />
            <Loading text={textLoading} isVisible={isLoading} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#F2F2F2"
    },
    btnLogout: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E3E3E3",
        borderBottomWidth: 1,
        borderBottomColor: "#E3E3E3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnLogoutText: {
        color: "#00A680"
    }
});
