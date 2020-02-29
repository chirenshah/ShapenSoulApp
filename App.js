import React, {Component} from "react";
import { TextInput, View, ScrollView, TouchableOpacity } from "react-native";
import stylesheet from 'react-native';

import {DefaultTheme, Provider as PaperProvider, Appbar,icon, IconButton} from 'react-native-paper';
import { Drawer } from "react-native-paper";

import Home from './components/Home.js';
import Profile from './components/Profile.js';
import Diet from './components/Diet.js';

import { createAppContainer, SafeAreaView } from "react-navigation";
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';

import { createStackNavigator } from 'react-navigation-stack';



const Menu = createDrawerNavigator(
  {
    Home: { screen: Home },
    Diet: { screen: Diet },
    Profile: { screen: Profile }
  },
  {
    contentComponent: props => (
      <ScrollView>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <Drawer.Section title = "Drawer">
            <Drawer.Item
              label="Home"
              active="true"
              onPress={() => props.navigation.navigate("Home")}
            />
            <Drawer.Item
              label="Profile"
              active="true"
              onPress={() => props.navigation.navigate("Profile")}
            />
            <Drawer.Item
              label="Diet"
              active="true"
              onPress={() => props.navigation.navigate("Diet")}
            />
          </Drawer.Section>
        </SafeAreaView>
      </ScrollView>
    )
  }
);

const AppNav = createAppContainer(Menu);

export default class App extends React.Component {
  render() {
    return <AppNav />;
  }
}

// const AppNavigator = createStackNavigator({
//   Home: Home,
//   Profile: Profile,
// },
// {
//   initialRouteName: 'Home',
// }
// );


// const AppContainer = createAppContainer(AppNavigator);

// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
