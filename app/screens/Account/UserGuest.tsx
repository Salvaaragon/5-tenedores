import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

function UserGuest(props) {
  const { navigation } = props;

  return (
    <>
      <Header
        backgroundColor="#00A680"
        centerComponent={{
          text: 'User profile',
          style: { fontSize: 20, color: 'white' },
        }}
      />
      <ScrollView style={styles.viewBody} centerContent={true}>
        <Image
          source={require('../../../assets/img/user-guest.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Look up your profile</Text>
        <Text style={styles.description}>
          What is the best restaurant you like the most? Search and show easily
          best restaurants, vote for which you prefer and comment about your
          experience.
        </Text>
        <View style={styles.viewBtn}>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Show your profile"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  headerIcon: {
    borderRadius: 100,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 5,
  },
  viewBody: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: '#00a680',
  },
  btnContainer: {
    width: '70%',
  },
});
