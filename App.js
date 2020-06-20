import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './screens/Login'
import UserProfile from './screens/Profile'
import Setting from './screens/Settings'
import Home from './screens/Home'
import Signup from './screens/Signup'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
    headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
          <Stack.Screen name="Profile" component={UserProfile} options={{ title: 'Profile'}} />
          <Stack.Screen name="Home" component={Home} options={{ title: 'Home'}} />
          <Stack.Screen name="Setting" component={Setting} options={{ title: 'Setting' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}