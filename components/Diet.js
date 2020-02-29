import React, { Component } from 'react';
import { Text,TextInput,Button, View, StyleSheet, ScrollView } from 'react-native';
import {AsyncStorage} from 'react-native';
import {DefaultTheme, Provider as PaperProvider, Appbar,icon, IconButton} from 'react-native-paper';
import { Drawer } from "react-native-paper";

import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';

import { FAB } from 'react-native-paper';


export default class Diet extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
      <ScrollView>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() =>
              this.props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
          <Appbar.Content title="Diet" />
          <Appbar.Action
          	icon="dots-vertical"
          	onPress={() =>
          		console.log('More')
          	}
          />
        </Appbar.Header>
        <Text>Here's your diet!</Text>
      <TextInput placeholder="Recipe"
        onChangeText={(text) => this.firstName = text}
        />

        <Button title="Submit" onPress = {async() => { 
            const Profile = {
              firstName: this.firstName,
              age : {is:"10"}
            }
            //console.log(Profile);
            try {
            const Sesame_Ladoo = "sesame seeds  150 gm jaggery desi 75 gm dry roast the sesame seeds, grind it in a coarse mixture.Add water in jaggery, make a jaggery syrup of one thread consistency .Mix the sesame seeds in the jaggery syrup.Make ladoos of medium size.Benefits :Seseame seeds are good source of calcium and phosphorous.Good for arthritis.";
            const test = await AsyncStorage.getAllKeys();
            await AsyncStorage.setItem('Sesame Ladoo',Sesame_Ladoo);
            // await AsyncStorage.mergeItem('Test',JSON.stringify(Profile.age));
            const please = await AsyncStorage.getItem(Profile.firstName);
            alert(please);
            } catch (error) {
              console.log(error);
            }
          }
        } style = {styles.container}/>
      <View style = {{flexDirection: 'column-reverse'}}></View>
      </ScrollView>

      <View style = {{flexDirection: 'column-reverse'}}>
        
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 40,
    right:0,
    padding: 5
  }
})
