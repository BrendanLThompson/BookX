import React, { Component, Image, useState,  useEffect, useContext} from "react";
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import APICommunicatorController from "../controllers/APICommunicatorController.js";
import { createStackNavigator } from '@react-navigation/stack';

import Firebase from "../config/firebase";

const db = Firebase.firestore();
const auth = Firebase.auth();

import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
//books.title?

const Item = ({ title, isbn, authors, image }) => {
  return (    
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {/* <Image style={{ width: 20, height: 20 }} source={{ image }} /> */}
      <Text style={styles.author}>{authors}</Text>
      <Text style={{ fontWeight: "bold" }}>
        ISBN:
        <Text style={{ fontWeight: "400" }}>{isbn}</Text>      
        
      </Text>
      <TouchableOpacity  style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Profile</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const renderItem = ({ item }) => (
  <Item
    title={item.title}
    isbn={item.isbn}
    authors={item.authors}
    image={item.image}
  />
);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      error: null,
      searchValue: "",
    };
    this.arrayholder = [];
  }

  searchFunction = (text) => {
    /* this.arrayholder = */

    APICommunicatorController.GetBookDetailsFromApi(text).then(
      (data) => {
        console.log("Book Data: ", data);
        const { books } = data;
        this.arrayholder = books;
        this.setState({ data: this.arrayholder });
      }
    );

    this.setState({ searchValue: text });
  };

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.container2}>
            <SearchBar
              placeholder="Search Here..."
              lightTheme
              value={this.state.searchValue}
              containerStyle={{ backgroundColor: "#81541F" }}
              onChangeText={(text) => this.searchFunction(text)}
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={styles.searchList}>
          <FlatList
            data={this.state.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  container: {
    padding: 10,
    backgroundColor: "#81541F",
  },
  container2: {
    marginTop: 40,
    backgroundColor: "#DBCBBE",
  },
  searchList: {
    backgroundColor: "#ffffff",
  },
  card: {
    backgroundColor: "#DBCBBE",
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  author: {
    fontSize: 15,
  },
  isbn: {
    fontSize: 12,
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: "#998579",
    padding: 5,
    borderRadius: 10,
  },
  addButtonText: {
    textAlign: 'center',
    color: "white"
  },
});
