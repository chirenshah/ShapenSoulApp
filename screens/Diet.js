import getRecipe from '../components/Fb'
import React, { Component } from 'react'
import {
    View,
    Text,
    Picker,
    FlatList
} from 'react-native'

export default class Diet extends Component{
    
    state = {
        recipe:{
            name:"Chiren",
            content:"hfbeiasufg"
        }
    }

    render(){
        return(
        <View>
            <Text>HI</Text>
            <Picker
                selectedValue={this.state.gender}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({name: itemValue})
                }>
                <Picker.Item label="Sesame Ladoo" value="Sesame Ladoo" />
                <Picker.Item label="Alfalfa seeds ladoo" value="Alfalfa seeds ladoo" />
                </Picker>
            <FlatList>
                data={this.state.recipe}
                ItemSeparatorComponent = {() => <Divider style={{backgroundColor:'black'}}></Divider>}
                keyExtractor={(item,index) => index.toSting()}
                renderItem={({item}) => (
                    <ListItem 
                    title = {`$(item.name)`}/>
                )}
            </FlatList>
        </View>
        )
    }
}