import {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {
  composeMail,
  createRecipients,
  showRecipients,
} from '../services/mailService';
import {EmailProps} from '../types/navigationType';

function Email({route}: EmailProps) {
  const [email, setEmail] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendMail = () => {
    if (recipients !== undefined) {
      composeMail(subject, body, recipients, route.params.image);
    }
  };

  const addRecipients = () => {
    const newRecipients: string[] = createRecipients(recipients, email);
    setRecipients(newRecipients);
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputFields}
          value={subject}
          onChangeText={setSubject}
          placeholder="Subject:"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.bodyInputField}
          value={body}
          onChangeText={setBody}
          placeholder="Body:"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputFields}
          value={email}
          onChangeText={setEmail}
          placeholder="To:"
        />
      </View>
      <Button title="Add recipient" onPress={addRecipients} />
      {(recipients && showRecipients(recipients)) || (
        <Text style={{margin: 10, fontSize: 22}}>No recipients</Text>
      )}
      <Button title="Send mail" onPress={sendMail} />
    </View>
  );
}

export default Email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aqua',
  },
  inputFields: {
    height: 35,
    width: 350,
    fontSize: 22,
    padding: 5,
  },
  bodyInputField: {
    height: 250,
    width: 350,
    fontSize: 22,
    padding: 5,
  },
  inputContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
  },
});
