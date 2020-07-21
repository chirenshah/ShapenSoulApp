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

  return (
    <Tab.Navigator>
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Chat" component={chat} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}

