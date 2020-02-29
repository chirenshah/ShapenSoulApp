import React, { Component } from 'react';
import { Text, View } from 'react-native';

import {DefaultTheme, Provider as PaperProvider, Appbar,icon, IconButton} from 'react-native-paper';
import { Drawer } from "react-native-paper";

import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';

export default class Profile extends React.Component {
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
          <Appbar.Content title="Profile" />
          <Appbar.Action
          	icon = 'magnify'
          	onPress = {() =>
          		console.log('Search')
          	}
          />
          <Appbar.Action
          	icon="dots-vertical"
          	onPress={() =>
          		console.log('More')
          	}
          />
        </Appbar.Header>
        <Text>Welcome to profile!</Text>
      </View>
    );
  }
}

