import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeNameForm from "./ChangeNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
    const { userInfo, setReloadData, toastRef } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const menuOptions = [
        {
            title: "Change firstname and lastname",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#CCC",
            iconNameRight: "chevron-right",
            iconColorRight: "#CCC",
            onPress: () => selectedComponent("name")
        },
        {
            title: "Change email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#CCC",
            iconNameRight: "chevron-right",
            iconColorRight: "#CCC",
            onPress: () => selectedComponent("email")
        },
        {
            title: "Change password",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#CCC",
            iconNameRight: "chevron-right",
            iconColorRight: "#CCC",
            onPress: () => selectedComponent("password")
        }
    ];

    const selectedComponent = key => {
        switch (key) {
            case "name":
                setRenderComponent(
                    <ChangeNameForm
                        displayName={userInfo.displayName}
                        setIsVisibleModal={setIsVisibleModal}
                        setReloadData={setReloadData}
                        toastRef={toastRef}
                    />
                );
                setIsVisibleModal(true);
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setIsVisibleModal={setIsVisibleModal}
                        setReloadData={setReloadData}
                        toastRef={toastRef}
                    />
                );
                setIsVisibleModal(true);
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm
                        setIsVisibleModal={setIsVisibleModal}
                        toastRef={toastRef}
                    />
                );
                setIsVisibleModal(true);
                break;
        }
    };

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

            {renderComponent && (
                <Modal
                    isVisible={isVisibleModal}
                    setIsVisible={setIsVisibleModal}
                >
                    {renderComponent}
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#E3E3E3"
    }
});
