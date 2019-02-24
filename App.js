/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Permissions from "react-native-permissions";

const options = {
  title: "Image Picker",
  // takePhotoButtonTitle: "Take Photo Sibal",
  chooseFromLibraryButtonTitle: "Library"
};

const { width, height } = Dimensions.get("window");

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: [],
      photoPermission: null
    };
  }

  imagePicker = () => {
    //Photo Permissions Request
    Permissions.request("photo").then(response => {
      if (response === "denied") {
        Permissions.openSettings();
      } else {
        this.setState({
          photoPermission: response
        });
      }
    });
    // One Image Select
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };

        this.setState({
          image: source
        });
      }
    });
  };

  componentDidMount() {
    //Photo Permissions Request
    Permissions.request("photo").then(response => {
      this.setState({ photoPermission: response });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={this.state.image}
          style={{ width: width / 2, height: height / 3 }}
        />
        <TouchableOpacity
          style={{ backgroundColor: "#cccccc", width: 100, height: 20 }}
          onPress={this.imagePicker}
        >
          <Text style={{ color: "#000000" }}>Image picker</Text>
        </TouchableOpacity>
        <Text>{this.state.photoPermission}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
