import {Alert} from 'react-native';
import {insertPhoto} from '../util/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export async function takePhoto(
  loadedImages: string[],
  subscribed: number,
  id: number,
) {
  if (loadedImages.length < 10 || subscribed === 1) {
    const photo: any = await launchCamera({
      quality: 0.5,
      mediaType: 'photo',
    });
    await insertPhoto(photo.assets[0].uri, id);
  } else {
    Alert.alert('Free space full buy subscription to add more photos');
  }
}

export async function uploadPhoto(
  loadedImages: string[],
  subscribed: number,
  id: number,
) {
  if (loadedImages.length < 10 || subscribed === 1) {
    const image: any = await launchImageLibrary({
      quality: 0.5,
      mediaType: 'photo',
    });
    await insertPhoto(image.assets[0].uri, id);
  } else {
    Alert.alert('Free space full buy subscription to add more photos');
  }
}
