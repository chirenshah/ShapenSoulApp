import React , {useEffect}from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Appointment from './Appointments'
import Setting from './Settings'
import chat from './chat'
import BackgroundTimer from 'react-native-background-timer'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import PushNotification from 'react-native-push-notification'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
  }});
  var Currentuser = auth().currentUser
  useEffect(()=>{
    console.log('1')
    const subscriber = database()
      .ref('messages/' + Currentuser.uid).limitToLast(1).on('child_added', snapshot => {
        console.log('2')
        const { text , user } = snapshot.val()
        console.log(snapshot)
        if(user._id == Currentuser.uid)
          PushNotification.localNotification({
            title:'Shape n soul',
            message:text
          })
      })
      return () => subscriber();
  } )

  return (
    <Tab.Navigator>
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Chat" component={chat} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}

