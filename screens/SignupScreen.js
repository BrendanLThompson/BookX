import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { useState } from "react";

import Firebase from "../config/firebase";

const auth = Firebase.auth();

const db = Firebase.firestore();

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onHandleSignup = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            const uid = response.user.uid;
            const data = {
              username,
            };

            db.collection("users").doc(uid).set(data);
          });
      }
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} bahavior="padding">
      <Image
        source={require("../assets/images/book.png")}
        style={styles.booklogo}
      ></Image>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="User's Name"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onHandleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign-Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#81541F",
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "brown",
    borderWidth: 2,
  },

  buttonText: {},

  buttonOutlineText: {},

  booklogo: {
    justifyContent: "center",
    alignItems: "center",
    top: -100,
  },
});
