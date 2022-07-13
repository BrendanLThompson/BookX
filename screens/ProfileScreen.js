import React, {useState, useEffect, useContext} from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

import Firebase from "../config/firebase";

const db = Firebase.firestore();

export default function ProfileScreen() {
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
  
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Image
          source={require("../assets/HomeImages/jane.png")}
          style={styles.user}
        ></Image>
        <Text style={styles.name}> Hello, {currentUser ? currentUser.username : "test"} </Text>
      </View>
      <View style={styles.card}>
        <Image
          source={require("../assets/images/harrypotter.jpeg")}
          style={styles.image}
        ></Image>
        <Text>Harry Potter and the Sorcerer's Stone</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#81541F",
    height: 120,
  },
  user: {
    height: 70,
    width: 70,
    borderRadius: 40,
    marginRight: 10,
    marginTop: 20,
  },
  name: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 35,
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
  card: {
    width: 300,
    height: 400,
    padding: 30,
  },
  image: {
    width: "60%",
    height: "60%",
  },
});
