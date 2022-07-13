import React from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Messages = [
  {
    id: "1",
    userName: "Lonzo",
    userImg: require("../assets/NavigationBarImages/person.png"),
    messageTime: "",
    messageText:
      "",
  },
  {
    id: "2",
    userName: "Brandon",
    userImg: require("../assets/NavigationBarImages/person.png"),
    messageTime: "",
    messageText:
      "",
  },
  {
    id: "3",
    userName: "Hannah",
    userImg: require("../assets/NavigationBarImages/person.png"),
    messageTime: "",
    messageText:
      "",
  },
  {
    id: "4",
    userName: "Ruby",
    userImg: require("../assets/NavigationBarImages/person.png"),
    messageTime: "",
    messageText:
      "",
  },
  {
    id: "5",
    userName: "Luis",
    userImg: require("../assets/NavigationBarImages/person.png"),
    messageTime: "",
    messageText:
      "",
  },
];

export default function MessagesScreen({ navigation }) {
  return (
    <View style={style.container}>
      
      <FlatList
        data={Messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={style.card}
            onPress={() =>
              navigation.navigate("Chat", {userName: item.userName})}
          >
            <View style={style.userInfo}>
              <View style={style.userImgContainer}>
                <Image source={item.userImg} style={style.userImg} />
              </View>

              <View style={style.textSection}>
                <View style={style.userInfoText}>
                  <Text style={style.userName}>{item.userName}</Text>

                  <Text style={style.postName}>{item.messageTime}</Text>
                </View>

                <Text style={style.messageText}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white",
  },

  titleContainer: {
    flexDirection: "row",
    top: 40,
  },

  titleScreen: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 15,
  },

  card: {
    width: "100%",
  },

  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  userImgContainer: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  userImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
  },

  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 0,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },

  userInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },

  postTime: {
    fontSize: 14,
    color: "#666",
  },

  messageText: {
    fontSize: 14,
    color: "#333333",
  },
});
