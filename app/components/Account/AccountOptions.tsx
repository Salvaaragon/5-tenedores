import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";

export default function AccountOptions() {
    const menuOptions = [
        {
            title: "Change firstname and lastname",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#CCC",
            iconNameRight: "chevron-right",
            iconColorRight: "#CCC",
            onPress: () => console.log("Change firstname and lastname")
        },
        {
            title: "Change email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#CCC",
            iconNameRight: "chevron-right",
            iconColorRight: "#CCC",
            onPress: () => console.log("Change email")
        },
        {
            title: "Change password",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#CCC",
            iconNameRight: "chevron-right",
            iconColorRight: "#CCC",
            onPress: () => console.log("Change password")
        }
    ];

    return (
        <View>
            {menuOptions.map((menu, idx) => (
                <ListItem
                    key={idx}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    onPress={menu.onPress}
                    containerStyle={styles.menuItem}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#E3E3E3"
    }
});
