import {useNavigation} from '@react-navigation/native';
import {Canvas} from '@benjeau/react-native-draw';
import {useRef} from 'react';
import {Button, View} from 'react-native';
import {saveDrawing} from '../services/drawService';
import ViewShot from 'react-native-view-shot';
import {DrawProps, RootStackParamList} from '../types/navigationType';
import {StackNavigationProp} from '@react-navigation/stack';

function Draw({route}: DrawProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const ref = useRef<any>();

  const mySaveFx = async () => {
    await saveDrawing(ref, route.params.id);
    navigation.navigate('Home', {
      id: route.params.id,
      username: route.params.username,
      subscribed: route.params.subscribed,
    });
  };

  return (
    <>
      <ViewShot style={{flex: 1}} ref={ref}>
        <Canvas color="black" style={{backgroundColor: 'white'}} />
      </ViewShot>
      <View style={{marginBottom: 25}}>
        <Button onPress={mySaveFx} title={'Save drawing'} />
      </View>
    </>
  );
}

export default Draw;
