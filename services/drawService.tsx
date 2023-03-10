import {captureRef as takeSnapshotAsync} from 'react-native-view-shot';
import {getDBConnection, insertPhoto} from '../util/database';

export async function saveDrawing(ref: any, id: number) {
  const signatureResult = await takeSnapshotAsync(ref, {
    result: 'tmpfile',
    quality: 0.5,
    format: 'png',
  });
  console.log(signatureResult + ' id:' + id);
  const db = await getDBConnection();
  insertPhoto(db, signatureResult, id);
}
