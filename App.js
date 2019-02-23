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
  Dimensions,
  Alert,
  ScrollView
} from "react-native";
// import ImagePicker from "react-native-image-picker";
import Permissions from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";

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
      avatarSource: [],
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
    // ImagePicker.launchImageLibrary(options, response => {
    //   console.log("Response = ", response);

    //   if (response.didCancel) {
    //     console.log("User cancelled image picker");
    //   } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    //   } else {
    //     const source = { uri: response.uri };
    //     console.log(response);
    //     this.setState({
    //       avatarSource: source
    //     });
    //   }
    // });
    const { avatarSource } = this.state;
    //Multiple Image Select
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true
    }).then(images => {
      images.map(image => {
        this.setState({
          avatarSource: avatarSource.concat(image)
        });
      });
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
        <ScrollView style={{ flex: 1 }}>
          {this.state.avatarSource.map(image => {
            <Image
              source={{
                uri: `data:${image.mime};base64,${image.data}`
              }}
              style={{
                width: width / 2,
                height: height / 3,
                paddingBottom: 30,
                flex: 1
              }}
            />;
          })}
        </ScrollView>
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
