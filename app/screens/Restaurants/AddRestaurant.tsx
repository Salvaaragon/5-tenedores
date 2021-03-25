import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Header, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/Restaurants/AddRestaurantForm';

export default function AddRestaurant(props) {
  const { navigation } = props;
  const { setIsReloadRestaurants } = navigation.state.params;
  const toastRef = useRef<Toast>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header
        backgroundColor="#00A680"
        leftComponent={
          <Icon
            type="material-community"
            name="arrow-left"
            color="white"
            containerStyle={styles.headerIcon}
            onPress={() => navigation.navigate('Restaurants')}
          />
        }
        centerComponent={{
          text: 'Top restaurants',
          style: { fontSize: 20, color: 'white' },
        }}
      />
      <ScrollView>
        <AddRestaurantForm
          toastRef={toastRef}
          setIsLoading={setIsLoading}
          navigation={navigation}
          setIsReloadRestaurants={setIsReloadRestaurants}
        />
        <Toast ref={toastRef} position="center" opacity={0.5} />
        <Loading isVisible={isLoading} text={'Adding new restaurant'} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    borderRadius: 100,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 5,
  },
});
