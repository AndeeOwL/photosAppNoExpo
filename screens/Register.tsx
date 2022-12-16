import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import RegisterForm from "../components/RegisterForm";
import { RootStackParamList } from "../types/navigationType";
import { insertUser } from "../util/database";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const usernameInputHandler = (enteredText: string) => {
    setUsername(enteredText);
  };

  const passwordInputHandler = (enteredText: string) => {
    setPassword(enteredText);
  };

  const repeatPasswordInputHandler = (enteredText: string) => {
    setRepeatPassword(enteredText);
  };

  const navigateLogin = async () => {
    if (password !== repeatPassword) {
      Alert.alert("Passwords does not match");
      return;
    }

    await insertUser(username, password, 0);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your photos app</Text>
      <RegisterForm
        usernameChange={usernameInputHandler}
        passwordChange={passwordInputHandler}
        repeatPasswordChange={repeatPasswordInputHandler}
        register={navigateLogin}
      />
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50,
  },
});
