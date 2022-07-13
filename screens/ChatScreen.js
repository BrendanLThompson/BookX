import React, { useState, useCallback, useEffect, useContext, useLayoutEffect } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";

import { GiftedChat } from "react-native-gifted-chat";

import Firebase from "../config/firebase";

const db = Firebase.firestore();
const auth = Firebase.auth();

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
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

  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc=>({
        _id: doc.data()._id, 
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
    ))
    return unsubscribe;
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0]

    db.collection("chats").add({
      _id, createdAt, text, user
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
         _id: auth?.currentUser?.email,
         name: currentUser ? currentUser.username : "test",
         avatar: auth?.currentUser?.photoURL
      }}
    />
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
