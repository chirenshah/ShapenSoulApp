import React, { Component } from 'react'
import { View,Button, Text, TouchableOpacity, TextInput , StyleSheet , Picker } from 'react-native'
import PDF from '../components/PDF'
import FB, { getUsers ,addUser } from '../components/Fb'
import firebase from 'react-native-firebase'
import { Share } from 'react-native-share'

export default class App extends Component {
    state = {
        User:{
            name:"",
            contact:"",
            Address:"",
            gender:"",
            BloodG:""
        },
        userList:[]
    }

    getUserNotification = (userList) => {
        console.log("User Added")        
        this.setState(prevState => {
            name: prevState.name = userList
        })
        
    }

    addComplete = (User) =>{
        console.log("Success")
        this.props.navigation.navigate("Login")
    }

    createUser = () => {
        const User = {
            name:this.state.name,
            contact:this.state.contact,
            Address:this.state.Address,
            gender:this.state.gender,
        }
        addUser(User,this.addComplete)
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
                <Button title="Sign Up" onPress={this.createUser}/>
            </View>
            </View>
            )
        }
    }

const styles = StyleSheet.create({
    container:{
       padding:20,
       backgroundColor:"white",
       height:800
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
        textAlign:'center',
        marginLeft:100
    }
})