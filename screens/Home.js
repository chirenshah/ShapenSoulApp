import React , {useEffect}from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Appointment from './Appointments'
import Setting from './Settings'
import chat from './chat'
import BackgroundTimer from 'react-native-background-timer'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import PushNotification from 'react-native-push-notification'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export default function MyTabs() {

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Appointments') {
              iconName = focused
                ? 'calendar'
                : 'calendar-outline';
            } 
            else if (route.name === 'Chat') {
              iconName = focused 
              ? 'chatbubble' 
              : 'chatbubble-outline';
            }
            else if (route.name === 'Settings') {
              iconName = focused 
              ? 'settings-sharp' 
              : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen name="Appointments" component={Appointment} />
      <Tab.Screen name="Chat" component={chat} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}

