import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControlBase,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

import { useState, useContext } from "react";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

import Firebase from "../config/firebase";

const db = Firebase.firestore();

export default function HomeScreen() {
  const { user, logout } = useContext(AuthenticatedUserContext);

  const [currentUser, setCurrentUser] = useState();

  const getUser = async () => {
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data:", documentSnapshot.data());
          setCurrentUser(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const [mapRegion, setmapRegion] = useState({
    latitude: 34.23783,
    longitude: -118.52367,
    latitudeDelta: 0.1122,
    longitudeDelta: 0.0421,
  });

  const [markOne, setmarkOne] = useState({
    latitude: 34.2422,
    longitude: -118.53077,
    latitudeDelta: 0.1122,
    longitudeDelta: 0.0421,
  });

  const [markTwo, setmarkTwo] = useState({
    latitude: 34.23844,
    longitude: -118.53097,
    latitudeDelta: 0.1122,
    longitudeDelta: 0.0421,
  });

  const [markThree, setmarkThree] = useState({
    latitude: 34.24008,
    longitude: -118.52875,
    latitudeDelta: 0.1122,
    longitudeDelta: 0.0421,
  });

  const [markFour, setmarkFour] = useState({
    latitude: 34.24115,
    longitude: -118.52812,
    latitudeDelta: 0.1122,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Image
          source={require("../assets/HomeImages/book_white.png")}
          style={styles.user}
        ></Image>

      </View>

      <View style={styles.container2}>
        <MapView style={{ height: "100%" }} region={mapRegion}>
          <Marker coordinate={markOne} title="Marker">
            <Image
              source={require("../assets/MarkerImages/BookxMarker.png")}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          </Marker>

          <Marker coordinate={markTwo} title="Marker">
            <Image
              source={require("../assets/MarkerImages/BookxMarker.png")}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          </Marker>

          <Marker coordinate={markThree} title="Marker">
            <Image
              source={require("../assets/MarkerImages/BookxMarker.png")}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          </Marker>

          <Marker coordinate={markFour} title="Marker">
            <Image
              source={require("../assets/MarkerImages/BookxMarker.png")}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#81541F",
    flex: 1,
  },
  container: {
    flexDirection: "row",
    top: 40,
    justifyContent: 'center', //Centered vertically
    alignItems: 'center' 
  },
  container2: {
    top: 40,
  },
  user: {
    height: 70,
    width: 70,
    borderRadius: 40,
    marginRight: 10,
    
  },
  name: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: "grey",
  },
});
