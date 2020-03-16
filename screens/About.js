import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput , StyleSheet , Picker } from 'react-native'
import PDF from '../components/PDF'
import FB, { getUsers } from '../components/Fb'
import firebase from 'react-native-firebase'

export default class App extends Component {
    state = {
        User:{
            name:"",
            contact:"",
            Address:"",
            gender:"",
            BloodG:""
        },
    confirmResult:null,
    verificationCode:"",
    UserId:'',
    userList:[]
    }

    validatePhoneNumber = () => {
        var valid = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return valid.test(this.state.phone)
        }
       
    handleSendCode = () => {
        // Request to send OTP
        if (this.validatePhoneNumber()) {
            firebase
            .auth()
            .signInWithPhoneNumber(this.state.phone)
            .then(confirmResult => {
                this.setState({ confirmResult })
                })
            .catch(error => {
            alert(error.message)
            console.log(error)
            })
        } else {
            alert('Invalid Phone Number')
            }
          }


    handleVerifyCode = () => {
     // Request for OTP verification
        const { confirmResult, verificationCode } = this.state
            if (verificationCode.length == 6) {
                confirmResult
                .confirm(verificationCode)
      .then(user => {
        this.setState({ userId: user.uid })
        alert(`Verified! ${user.uid}`)
      })
      .catch(error => {
        alert(error.message)
        console.log(error)
      })
  } else {
    alert('Please enter a 6 digit OTP code.')
  }
}
    getUserNotification = (userList) => {
        console.log("User Added")        
        this.setState(prevState => {
            name: prevState.name = userList
        })
        
    }

    createUser = () => {
        const User = {
            name:this.state.name,
            contact:this.state.contact,
            Address:this.state.Address,
            gender:this.state.gender,
        }
        console.log(User)
    }

    componentDidMount(){
        getUsers(this.getUserNotification)
        this.UNSAFE_componentWillMountisMounted = true
    }

    async readUsers() {
        var snapshot = await firebase.firestore()
                .collection('Users')
                .get()
        snapshot.forEach((data) => {
            const userItem = data.data()
            //this.state.userList.push(userItem)
            console.log(data);
        });
    }

    render() {
        return(
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.text}> Profile</Text>
            </View>
            <TextInput placeholder="NAME" style={styles.input}
                value={ this.state.name }
                onChangeText={(text) =>{
                this.setState({name:text})
                }}
            />
            <TextInput placeholder="Contact No." style={styles.input}
                value={ this.state.contact }
                onChangeText={(text) =>{
                    this.setState({contact:text})
                }}
            />
            <TextInput placeholder="Address" style={styles.input}
                value={ this.state.Address}
                onChangeText={(text) =>{
                    this.setState({Address:text})
                }}
            />
            <View style={styles.input}>
                <Picker
                    selectedValue={this.state.gender}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({gender: itemValue})
                    }>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
            </View>
            <TextInput placeholder="Blood Group" style={styles.input}
                value={ this.state.BloodG }
                onChangeText={(text) =>{
                    this.setState({BloodG:text})
                }}
            />
            <Text>{this.state.name}</Text>
            <View style={styles.foo}>
            <TouchableOpacity onPress={this.createUser} >
                <Text style={{color:"white"}}>Submit</Text>
            </TouchableOpacity>
            </View>
            </View>
            )
        }
    }

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column"
    },
    header:{
        height:60,
        padding:15,
        backgroundColor: 'black'
    },
    text:{
        color:'white',
        fontSize:25,
        textAlign:'center'
    },
    input:{
        borderColor:"black",
        borderWidth:1,
        margin:20,
        backgroundColor:'#e8eeef',
        width:300,
        alignSelf:'center',
        textAlign:'center'
    },
    picker:{
        paddingLeft:100,
        width: 300,
        color:'#C7C7CD',
        textAlign:'center'
    },
    foo:{
        width:200,
        backgroundColor:"black",
        padding:10,
        paddingLeft:75,
        textAlign:'center',
        borderColor:"black",
        borderWidth:1,
        marginLeft:100
    }
})