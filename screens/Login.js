import React, { Component } from 'react'
import {
    View, 
    Text, 
    TouchableOpacity,
    TextInput ,
    StyleSheet ,
    Picker,
    Button 
    } from 'react-native'
import {login , subscribeToAuthChanges} from '../components/Fb'
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-popup-dialog';

export default class LoginScreen extends React.Component{
    state = {
        email:"",
        password:"",
        empty:false,
        error:false,
        errordis:""
    }
    componentDidMount(){
        subscribeToAuthChanges(this.authStateChanged)
    }
    validation= () =>{
        if(this.state.email !== "" & this.state.password !== "")
        {
            login(this.state.email,this.state.password,this.popup) 
        }
        else{
            this.setState({
                empty:true
            })
        }
        }
        popup(error){
           this.setState({
               error:true,
               errordis:error})
        }
    authStateChanged = (user) => {
        if(user !== null){
            this.props.navigation.navigate("Home");
        }
    }

    render(){
        return(
            <View style={{backgroundColor:"white",
            height:800}}>
                <View style={styles.logo}>
                <Text style={{fontSize:50}}>Shape N Soul</Text>
                </View>
                <View style={styles.container}>
                    <TextInput placeholder="Email" style={styles.input}
                    value={ this.state.email }
                    onChangeText={(text) =>{
                    this.setState({email:text})
                    }} />
                    <TextInput placeholder="Password" style={styles.input}
                    value={ this.state.password }
                    secureTextEntry={true}
                    onChangeText={(text) =>{
                    this.setState({password:text})
                    }} />
                    <View style={styles.button}>
                        <Button title="Login" onPress={()=> this.validation()} />
                    </View>
                    <Text style = {{alignSelf: "center"}}> Not a User? </Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Signup")}>
                        <Text style = {styles.signup}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
                <Dialog
                onDismiss={() => {
                    this.setState({ empty: false });
                }}
                width={0.9}
                visible={this.state.empty}
                rounded
                actionsBordered
                dialogTitle={
                <DialogTitle
                    title="Email or Password Field is empty"
                style={{
                    backgroundColor: '#F7F7F8',
                }}
                hasTitleBar={false}
                align="center"
                />
                }
                footer={
                    <DialogFooter>
                    <DialogButton
                        text="OK"
                        bordered
                        onPress={() => {
                        this.setState({ empty: false });
                        }}
                        key="button-2"
                    />
                    </DialogFooter>
                }>
                <DialogContent
                    style={{
                    backgroundColor: '#F7F7F8',
                    }}>
                    <Text>Please fill both Email and Password field</Text>
                </DialogContent>
                </Dialog>
                <Dialog
                onDismiss={() => {
                    this.setState({ error: false });
                }}
                width={0.9}
                visible={this.state.error}
                rounded
                actionsBordered
                dialogTitle={
                <DialogTitle
                    title="Login Error"
                style={{
                    backgroundColor: '#F7F7F8',
                }}
                hasTitleBar={false}
                align="center"
                />
                }
                footer={
                    <DialogFooter>
                    <DialogButton
                        text="OK"
                        bordered
                        onPress={() => {
                        this.setState({ incorrect: false });
                        }}
                        key="button-2"
                    />
                    </DialogFooter>
                }>
                <DialogContent
                    style={{
                    backgroundColor: '#F7F7F8',
                    }}>
                    <Text>{this.state.errordis}</Text>
                </DialogContent>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        padding:10,
        margin:10,
        alignSelf:'center',
        width:300,
        height:50,
        textAlign:"center",
        backgroundColor:"#e8eeef"
    },
    container:{
        marginTop:140
    },
    logo:{
        marginTop:100,
        alignSelf:"center"
    },
    button:{
        alignSelf:"center",
        margin:5,
        padding:20,
        width:200,
    },
    signup:{
        alignSelf:"center",
        color:"blue",
        fontSize:18
    }
})