import React from 'react'
import { View,Button, Text, TextInput , StyleSheet , Picker } from 'react-native'
import { subscribeToAuthChanges,updateProfile } from '../components/Fb'
import firebase from 'react-native-firebase'

export default class UserProfile extends React.Component {
    state = {
        name:"",
        email:"",
        contact:"",
        Address:"",
        gender:"",
        BloodG:"",
    }
    componentDidMount(){
        subscribeToAuthChanges(this.authStateChanged)
    }
    authStateChanged = (User) =>{
        this.setState({email:User.email})
    }

    updateComplete = (User)  =>{
        console.log(User);
    } 
    update = () => {
        const User = {
            name:this.state.name,
            email:this.state.email,
            contact:this.state.contact,
            Address:this.state.Address,
            gender:this.state.gender,
        }
        updateProfile(User,this.updateComplete)
    }  

    render() {
        return(
        <View style={styles.container}>
            <TextInput placeholder="Name" style={styles.input}
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
                <Button title="Update Profile" onPress={() => {
                    this.update();
                }}/>
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