import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {AccessToken, LoginButton, Profile} from 'react-native-fbsdk-next';
import LoginForm from '../components/LoginForm';
import {loginCheck} from '../services/userService';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigationType';
import {fetchUser, getDBConnection, insertUser} from '../util/database';
import {
  GoogleSignin,
  GoogleSigninButton,
  User,
} from '@react-native-google-signin/google-signin';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [googleUser, setGoogleUser] = useState<User>();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const userInputHandler = (enteredText: string) => {
    setUsername(enteredText);
  };

  const passwordInputHandler = (enteredText: string) => {
    setPassword(enteredText);
  };

  const navigateLogin = async () => {
    const user: any = await loginCheck(username, password);
    if (user) {
      navigation.navigate('Home', {
        id: user[0],
        username: user[1],
        subscribed: user[3],
      });
    }
  };

  const navigateRegister = () => {
    navigation.navigate('Register');
  };

  const loginWithFaceBook = () => {
    Profile.getCurrentProfile().then(async function (currentProfile: any) {
      if (currentProfile) {
        console.log(currentProfile);
        const db = await getDBConnection();
        const user: any = await fetchUser(db, currentProfile.name);
        if (user.length === 4) {
          navigation.navigate('Home', {
            id: user[0],
            username: user[1],
            subscribed: user[3],
          });
        }
        await insertUser(db, currentProfile.name, currentProfile.userID, 0);
        const newUser: any = fetchUser(db, currentProfile.name);
        navigation.navigate('Home', {
          id: newUser[0],
          username: newUser[1],
          subscribed: newUser[3],
        });
      }
    });
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        setGoogleUser(userInfo);
      }
    } catch (error) {
      Alert.alert('Something went wrong !');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your photos app</Text>
      <LoginForm
        usernameChange={userInputHandler}
        passwordChange={passwordInputHandler}
        login={navigateLogin}
        register={navigateRegister}
      />
      <LoginButton
        onLoginFinished={(error: any, result: any) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data: any) => {
              console.log(data.accessToken.toString());
            });
            loginWithFaceBook();
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
      {
        <View style={styles.googleLoginButton}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        </View>
      }
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 50,
  },
  googleLoginButton: {
    margin: 10,
    paddingHorizontal: 15,
  },
});
