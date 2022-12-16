import Mailer from 'react-native-mail';
import {Alert, Text} from 'react-native';

export async function composeMail(
  subject: string,
  body: string,
  recipients: string[],
  image: string,
) {
  Mailer.mail(
    {
      subject: subject,
      recipients: recipients,
      body: body,
      attachments: [{uri: image}],
    },
    (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {
            text: 'Cancel',
            onPress: () => console.log('CANCEL: Email Error Response'),
          },
        ],
        {cancelable: true},
      );
    },
  );
}

export function createRecipients(recipients: string[], email: string) {
  let newRecipients: string[] = [...recipients];
  newRecipients.push(email);
  return newRecipients;
}

export function showRecipients(recipients: string[]) {
  return recipients.map((recipient, index) => {
    return (
      <Text style={{fontSize: 22}} key={index}>
        {recipient}
      </Text>
    );
  });
}
