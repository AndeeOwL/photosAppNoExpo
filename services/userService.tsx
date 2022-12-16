import {Alert} from 'react-native';

import {fetchUser} from '../util/database';

export async function loginCheck(username: string, password: string) {
  const user: any = await fetchUser(username);
  if (user) {
    if (username !== user[1]) {
      Alert.alert('Invalid username');
    } else if (password !== user[2]) {
      Alert.alert('Invalid password');
    } else return user;
  }
}
