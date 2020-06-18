import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

class Fire {
    constructor() {

    } 
    get uid() {
      return (auth().currentUser || {}).uid;
    }
  
    get ref() {
      return database().ref('messages/' + this.uid);
    }
  
    parse = snapshot => {
      const { timestamp: numberStamp, text, user } = snapshot.val();
      const { key: _id } = snapshot;
      const timestamp = new Date(numberStamp);
      const message = {
        _id,
        timestamp,
        text,
        user,
      };
      return message;
    };
    
  
    on = callback =>
      this.ref
        .limitToLast(20)
        .on('child_added', snapshot => callback(this.parse(snapshot)));
  
    get timestamp() {
      return database.ServerValue.TIMESTAMP;
    }
    // send the message to the Backend
    send = messages => {
        console.log(messages)
      for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        const message = {
          text,
          user,
          timestamp: this.timestamp,
        };
        this.append(message);
      }
    };
  
    append = message => this.ref.push(message);
  
    // close the connection to the Backend
    off() {
      this.ref.off();
    }
  }
  
  Fire.shared = new Fire();
  export default Fire;