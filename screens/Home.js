import React, { useState , Component} from 'react';
import { Button, TextInput , View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/Login'
import signup from './screens/Signup'

export default class Home extends Component{

  render(){
    return(
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Signup" component={signup} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    )
  }
}