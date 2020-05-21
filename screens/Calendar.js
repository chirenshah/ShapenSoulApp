import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import {Calendar} from 'react-native-calendars';
import {appointment} from '../components/Fb'

 
export default class Calc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  
  onDayPress(day) {
    this.setState({
      selected: day.dateString,
      selectedDate: day.dateString

    });
    console.log(day)   
  }

  _onPressBack(){
    const {goBack} = this.props.navigation
      goBack()
  }

  render() {
    const { selectedDate } = this.state
    //const DateString = selectedDate ? selectedDate.toString() : '';
    return ( 
      <View style={styles.container}>
	      <StatusBar barStyle="light-content"/>
	      
	        <Calendar
    				onDayPress={this.onDayPress}
    				style={styles.calendar}
    				hideExtraDays
            minDate={Date()}
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
		        //onPress = {() => }
            onPress={() => console.log("Requested", selectedDate)}
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