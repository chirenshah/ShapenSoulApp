import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Appointment from './Appointments'
import Setting from './Settings'
import chat from './chat'
import BackgroundTimer from 'react-native-background-timer'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import PushNotification from 'react-native-push-notification'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  var user = auth().currentUser
  const intervalId = BackgroundTimer.setInterval(() => {
    const subscriber = database()
      .ref('messages/' + user.uid).on('child_added', snapshot => {
        
      });
      return () => subscriber()
}, 10200);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Chat" component={chat} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}