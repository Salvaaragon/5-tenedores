import React, { useState, useEffect } from "react";
import firebaseApp from "../../utils/FireBase";
import { View, Text } from "react-native";

export default function MyAccount() {
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(user => {
            !user ? setLogin(false) : setLogin(true);
        });
    }, []);

    if (login === null) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        );
    }

    if (login) {
        return (
            <View>
                <Text>Usuario autenticado</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Usuario no autenticado</Text>
        </View>
    );

    // return (
    //     <View>
    //         <Text>My account</Text>
    //     </View>
    // );
}
