import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";
import Search from "../screens/SearchScreen";
import ChatScreen from "../screens/ChatScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const MessageStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} 
    options={{
      headerStyle:{
        backgroundColor: '#81541F',
    }}} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerStyle:{
          backgroundColor: '#81541F',
      }
      })}
    />
  </Stack.Navigator>
);

export default function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          padding: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#81541F" : "#B8977E",
                fontSize: 13,
                top: 10,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/NavigationBarImages/home.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#81541F" : "#B8977E",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#81541F" : "#B8977E",
                fontSize: 13,
                top: 10,
              }}
            >
              Search
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/NavigationBarImages/search.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#81541F" : "#B8977E",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#81541F" : "#B8977E",
                fontSize: 13,
                top: 10,
              }}
            >
              Message
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/NavigationBarImages/chat.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#81541F" : "#B8977E",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#81541F" : "#B8977E",
                fontSize: 13,
                top: 10,
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/NavigationBarImages/person.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "#81541F" : "#B8977E",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    tintColor: "#81541F",
  },
});
