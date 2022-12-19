import {Alert} from 'react-native';

import {fetchUser, getDBConnection} from '../util/database';

export async function loginCheck(username: string, password: string) {
  const db = await getDBConnection();
  const user: any = await fetchUser(db, username);
  if (user) {
    if (username !== user[1]) {
      Alert.alert('Invalid username');
    } else if (password !== user[2]) {
      Alert.alert('Invalid password');
    } else return user;
  }
}
