import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Header, Icon, ListItem, Rating } from 'react-native-elements';
import CustomCarousel from '../../components/CustomCarousel';
import Map from '../../components/Map';
import ListReviews from '../../components/Restaurants/ListReviews';
import { firebaseApp } from '../../utils/FireBase';

const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get('window').width;

export default function Restaurant(props) {
  const { navigation } = props;
  const { restaurant } = navigation.state.params;
  const [imagesRestaurant, setImagesRestaurant] = useState([]);
  const [rating, setRating] = useState(restaurant.rating);
  const [isFavourite, setIsFavourite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef<Toast>();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    const arrayUrls = [];

    (async () => {
      await Promise.all(
        restaurant.images.map(async (idImage) => {
          await firebase
            .storage()
            .ref(`restaurant-images/${idImage}`)
            .getDownloadURL()
            .then((imageUrl) => {
              arrayUrls.push(imageUrl);
            });
        }),
      );
      setImagesRestaurant(arrayUrls);
    })();
  }, []);

  useEffect(() => {
    if (userLogged) {
      db.collection('favourites')
        .where('idRestaurant', '==', restaurant.id)
        .where('idUser', '==', firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
          if (response.docs.length === 1) {
            setIsFavourite(true);
          }
        });
    }
  }, []);

  const addFavourite = () => {
    if (!userLogged) {
      toastRef.current.show(
        'Only logged users can mark restaurants as favourite',
        2000,
      );
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idRestaurant: restaurant.id,
      };

      db.collection('favourites')
        .add(payload)
        .then(() => {
          setIsFavourite(true);
          toastRef.current.show(
            'Restaurant added to your favourites list',
            2000,
          );
        })
        .catch(() => {
          toastRef.current.show(
            'Error adding restaurant to your favourites list. Try again later',
            2000,
          );
        });
    }
  };

  const removeFavourite = () => {
    db.collection('favourites')
      .where('idRestaurant', '==', restaurant.id)
      .where('idUser', '==', firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavourite = doc.id;
          db.collection('favourites')
            .doc(idFavourite)
            .delete()
            .then(() => {
              setIsFavourite(false);
              toastRef.current.show(
                'Restaurant removed from your favourites list',
                2000,
              );
            })
            .catch(() => {
              toastRef.current.show(
                'Error removing restaurant from your favourites list. Try again later',
                2000,
              );
            });
        });
      })
      .catch(() => {});
  };

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
            onPress={() =>
              navigation.navigate(navigation.state.params.prevSection)
            }
          />
        }
        centerComponent={{
          text: restaurant.name,
          style: { fontSize: 20, color: 'white' },
        }}
      />
      <ScrollView style={styles.viewBody}>
        <View style={styles.viewFavourites}>
          <Icon
            type="material-community"
            name="heart"
            onPress={isFavourite ? removeFavourite : addFavourite}
            color={isFavourite ? '#00A680' : '#C2C2C2'}
            size={35}
            underlayColor="transparent"
          />
        </View>
        <CustomCarousel
          arrayImages={imagesRestaurant}
          width={screenWidth}
          height={200}
        />
        <RestaurantTitle
          name={restaurant.name}
          description={restaurant.description}
          rating={rating}
        />
        <RestaurantInfo
          location={restaurant.location}
          name={restaurant.name}
          address={restaurant.address}
          website={restaurant.website}
          phone={restaurant.phone}
        />
        <ListReviews
          navigation={navigation}
          idRestaurant={restaurant.id}
          setRating={setRating}
        />
        <Toast ref={toastRef} position="center" opacity={0.5} />
      </ScrollView>
    </>
  );
}

function RestaurantTitle(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.restaurantName}>{name}</Text>
        <Rating
          style={styles.restaurantRating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.restaurantDescription}>{description}</Text>
    </View>
  );
}

function RestaurantInfo(props) {
  const { location, name, address, website, phone } = props;

  const listInfo = [
    {
      text: address,
      iconName: 'map-marker',
      iconType: 'material-community',
      action: null,
    },
    {
      text: website ? website : '-',
      iconName: 'web',
      iconType: 'material-community',
      action: null,
    },
    {
      text: phone ? phone : '-',
      iconName: 'phone',
      iconType: 'material-community',
      action: null,
    },
  ];

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>Restaurant information</Text>
      <Map location={location} name={name} height={100} />
      {listInfo.map((item, idx) => (
        <ListItem
          key={idx}
          title={item.text}
          leftIcon={{
            name: item.iconName,
            type: item.iconType,
            color: '#00A680',
          }}
          containerStyle={styles.containerListItem}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  headerIcon: {
    borderRadius: 100,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 5,
  },
  viewFavourites: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 35,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5,
  },
  viewRestaurantTitle: {
    margin: 15,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  restaurantRating: {
    position: 'absolute',
    right: 0,
  },
  restaurantDescription: {
    marginTop: 5,
    color: 'grey',
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25,
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerListItem: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
  },
});
