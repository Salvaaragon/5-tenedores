import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>5 Tenedores</Text>
      <Button 
        title="Click me" 
        loading={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
