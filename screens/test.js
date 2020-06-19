import PushNotification from 'react-native-push-notification'
import React , { Component } from 'react';
import { View ,Button} from 'react-native';
import { TestScheduler } from 'jest';

class test extends Component{
    constructor(){
        super();
        PushNotification.configure({
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
            
                // process the notification
            
                // (required) Called when a remote is received or opened, or local notification is opene
              },
            
              // IOS ONLY (optional): default: all - Permissions to register.
              permissions: {
                alert: true,
                badge: true,
                sound: true,
              },
            
              // Should the initial notification be popped automatically
              // default: true
              popInitialNotification: true,
            
              /**
               * (optional) default: true
               * - Specified if permissions (ios) and token (android and ios) will requested or not,
               * - if not, you must call PushNotificationsHandler.requestPermissions() later
               * - if you are not using remote notification or do not have Firebase installed, use this:
               *     requestPermissions: Platform.OS === 'ios'
               */
              requestPermissions: true,
            });
    }
    test(){
        PushNotification.localNotification({
            title:'Shape n soul',
            message: "Stay home stay safe"
        })
    }
    render(){
        return(
            <View><Button title = 'Click' onPress={this.test}/></View>
        )
    }
}

