import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Signup from './screens/Signup'
import AboutScreen from './screens/About'
import LoginScreen from './screens/Login'
import Diet from './screens/Diet'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  home = () => {
    return(
      <Drawer.Navigator>
          <Drawer.Screen name="Foo" component={Diet}/>
          <Drawer.Screen name="Diet generator" component={LoginScreen}/> 
      </Drawer.Navigator>
    )}

  render(){
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" children={this.home}/>
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
}