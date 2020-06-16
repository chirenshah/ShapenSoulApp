import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Appointment from './Appointments'
import Setting from './Settings'
import chat from './chat'


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Chat" component={chat} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}