import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { ShareDialog } from "react-native-fbsdk-next";
import { windowHeight, windowWidth } from "../constants/dimensions";
import { PhotoPreviewProps, RootStackParamList } from "../types/navigationType";

function PhotoPreview({ route }: PhotoPreviewProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const photoUri = "file://" + route.params.image;

  const sharePhotoContent: any = {
    contentType: "photo",
    photos: [{ imageUrl: photoUri }],
  };

  const facebookShare = () => {
    ShareDialog.show(sharePhotoContent);
  };

  const sendMail = () => {
    navigation.navigate("Email", {
      image: route.params.image,
    });
  };

  return (
    <View style={styles.container}>
      <Button title='SHARE ON FACEBOOK' color='blue' onPress={facebookShare} />
      <Button title='SEND ON EMAIL' color='blue' onPress={sendMail} />
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{ uri: route.params.image }} />
      </ScrollView>
    </View>
  );
}

export default PhotoPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aqua",
  },
  image: {
    height: windowHeight,
    width: windowWidth,
  },
});
