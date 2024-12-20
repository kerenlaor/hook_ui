import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import this
import displaySpanPrimary from "../../common/styles/displaySpanPrimary";
import inputFieldStyle from "../../common/styles/inputField";
import inputTextStyles from "../../common/styles/inputText";
import primaryButtonStyle from "../../common/styles/primaryButton";
import { UserProfileContext } from "../store/usersProfileContext";
import { sendUserInLogin } from "../utils/http";

export default function Login({ navigation }) {
  const usersProfileContext = useContext(UserProfileContext);
  const [user, setUser] = useState({ userName: "", email: "", password: "" });

  const profileScreen = "Profile";
  return (
    <GestureHandlerRootView
      style={displaySpanPrimary.verticalContainerFromStart}
    >
      <View style={displaySpanPrimary.verticalContainerFromStart}>
        <View style={inputFieldStyle.container}>
          <Text style={displaySpanPrimary.h1}>Login To Hook</Text>
        </View>
        <View style={inputFieldStyle.container}>
          <Text style={inputFieldStyle.label}>Enter Email:</Text>
          <TextInput
            style={inputTextStyles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={user.email}
            maxLength={35}
            onChangeText={(text) => {
              setUser((prevUser) => ({
                ...prevUser,
                email: text,
              }));
            }}
          />
        </View>
        <View style={inputFieldStyle.container}>
          <Text style={inputFieldStyle.label}>Enter User Name:</Text>
          <TextInput
            style={inputTextStyles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={user.userName}
            maxLength={35}
            onChangeText={(text) => {
              setUser((prevUser) => ({
                ...prevUser,
                userName: text,
              }));
            }}
          />
        </View>
        <View style={inputFieldStyle.container}>
          <Text style={inputFieldStyle.label}>Enter Passward:</Text>
          <TextInput
            style={inputTextStyles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={user.password}
            maxLength={35}
            onChangeText={(text) => {
              setUser((prevUser) => ({
                ...prevUser,
                password: text,
              }));
            }}
          />
        </View>
        <View style={inputFieldStyle.container}>
          <Text style={inputFieldStyle.label}>
            user not exist, please sign up
          </Text>
        </View>
      </View>
      <View style={displaySpanPrimary.verticalContainerFromStart}>
        <TouchableOpacity
          style={primaryButtonStyle.button} // Set hex color
          onPress={() => {
            sendUserInLogin(user)
              .then((response) => {
                console.log("response is:");
                console.log(response);
                usersProfileContext.loginToProfile(response.data);
                navigation.navigate("Main", { screen: "Profile" });
              })
              .catch((reason) => console.log(reason));
          }} // Add functionality here
        >
          <Text style={primaryButtonStyle.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}
