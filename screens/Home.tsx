import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import PhotosList from '../components/PhotosList';
import {takePhoto, uploadPhoto} from '../services/photoService';
import {HomeProps, RootStackParamList} from '../types/navigationType';
import {fetchPhotos, getDBConnection} from '../util/database';

function Home({route}: HomeProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [loadedImages, setLoadedImages] = useState(['']);

  useEffect(() => {
    async function loadPhotos() {
      const db = await getDBConnection();
      const photoList: any = await fetchPhotos(db, route.params.id);
      setLoadedImages(photoList);
    }
    if (isFocused) {
      loadPhotos();
    }
  }, [isFocused]);

  const takePhotoHandler = async () =>
    await takePhoto(loadedImages, route.params.subscribed, route.params.id);

  const uploadPhotoHandler = async () =>
    await uploadPhoto(loadedImages, route.params.subscribed, route.params.id);

  const navigateDraw = () => {
    if (loadedImages.length < 10) {
      navigation.navigate('Draw', {
        id: route.params.id,
        username: route.params.username,
        subscribed: route.params.subscribed,
      });
    } else {
      Alert.alert('Free space full buy subscription to add more photos');
    }
  };

  const navigatePayments = () => {
    navigation.navigate('PaymentScreen', {
      id: route.params.id,
      username: route.params.username,
      subscribed: route.params.subscribed,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.username}</Text>
      <Text style={styles.secondTitle}>photosApp</Text>
      <PhotosList images={loadedImages} />
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <Button title="Take Photo" onPress={takePhotoHandler} />
        </View>
        <View style={styles.buttons}>
          <Button title="Upload Photo" onPress={uploadPhotoHandler} />
        </View>
        <View style={styles.buttons}>
          <Button title="Draw Photo" onPress={navigateDraw} />
        </View>
      </View>
      <View style={styles.subButton}>
        <Button title="Subscribe" onPress={navigatePayments} />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 50,
  },
  secondTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttons: {
    marginHorizontal: 10,
  },
  subButton: {
    marginBottom: 25,
  },
});
