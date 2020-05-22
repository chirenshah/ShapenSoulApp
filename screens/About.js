import React, { useState , Component} from 'react';
import { Button, TextInput , View, Text } from 'react-native';
import firebase from 'react-native-firebase';

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  async function signInWithPhoneNumber() {
    const confirmation = await firebase.auth().signInWithPhoneNumber('+918976305456');
    setConfirm(confirmation);
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+918169287917')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

// export default class Test extends Component{
//   state={
//     confirm:null,
//     code:''
//   }

//   async confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   async signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber);
//     this.setState({confirm:confirmation});
//   }

//   render(){
//     return(
//       <View>
//         <Text>HI</Text>
//         <Button title="test" onPress={()=>this.signInWithPhoneNumber('+918169287917')}/>
//       </View>
//     )
//   }
// }