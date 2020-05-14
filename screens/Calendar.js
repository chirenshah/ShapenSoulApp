import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import {Calendar} from 'react-native-calendars';
 
export default class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
    console.log(day)
  }

  _onPressBack(){
    const {goBack} = this.props.navigation
      goBack()
  }

  render() {
    return (
      <View style={styles.container}>
	      <StatusBar barStyle="light-content"/>
	      
	        <Calendar
				onDayPress={this.onDayPress}
				style={styles.calendar}
				hideExtraDays

				markedDates={{[this.state.selected]: {selected: true}}}
				theme={{
					selectedDayBackgroundColor: 'blue',
					todayTextColor: 'blue',
					arrowColor: 'blue',            
				}}
	        />
	        <View style = {styles.button} >
		        <Button 
			        title="Request Appointment"
			        onPress={() => console.log("Requested") }
		        />
		    </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350,
  },
  button: {
  	alignSelf:"center",
    width: 360,
    margin: 170
  }
});