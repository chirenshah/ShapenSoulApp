import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Signup from './screens/Signup'
import AboutScreen from './screens/About'
import LoginScreen from './screens/Login'
import Diet from './screens/Diet'
import User from './screens/UserDb'
import Appointments from './screens/Appointments'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  home = () => {
    return(
      <Drawer.Navigator>
          <Drawer.Screen name="Diet generator" component={Diet} />
          <Drawer.Screen name="User" component={User}/> 
          <Drawer.Screen name="Appointments" component={Appointments}/> 
      </Drawer.Navigator>
    )}

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode= 'screen'>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Sign Up' }}/>
          <Stack.Screen name="Home" children={this.home} options= {{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}