import 'react-native-gesture-handler';
import 'react-native-sqlite-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useEffect} from 'react';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import PhotoPreview from './screens/PhotoPreview';
import {LogBox, StatusBar} from 'react-native';
import Draw from './screens/Draw';
import Email from './screens/Email';
import {initStripe} from '@stripe/stripe-react-native';
import PaymentScreen from './screens/PaymentScreen';
import {RootStackParamList} from './types/navigationType';
import {createTable, getDBConnection} from './util/database';
import {Settings} from 'react-native-fbsdk-next';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  Settings.initializeSDK();
  LogBox.ignoreLogs(['source.uri', 'Possible', 'useEffect', 'Internal']);
  const initDB = async () => {
    const db = await getDBConnection();
    await createTable(db);
  };
  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    initStripe({
      publishableKey:
        'pk_test_51MBzQlDch9HJ0Xyveqow9hZlYE5cTdVoR7doXYq0BGl7IDfqgok3QnCFcOAmVm98HRGnWTTA5Ir7ONOi0e25LPJN00bHCDuuUR',
      merchantIdentifier: 'merchant.com.photosApp',
      urlScheme: 'https://buy.stripe.com/test_fZe8ze52C4zm4hy6oo',
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PhotoPreview"
            component={PhotoPreview}
            options={{
              title: '',
              headerShown: true,
              headerStyle: {
                backgroundColor: 'aqua',
              },
            }}
          />
          <Stack.Screen
            name="Draw"
            component={Draw}
            options={{
              title: '',
              headerShown: true,
              headerStyle: {
                backgroundColor: 'aqua',
              },
            }}
          />
          <Stack.Screen
            name="Email"
            component={Email}
            options={{
              title: '',
              headerShown: true,
              headerStyle: {
                backgroundColor: 'aqua',
              },
            }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              title: '',
              headerShown: true,
              headerStyle: {
                backgroundColor: 'aqua',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
