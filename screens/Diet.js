import React from 'react';
import { SafeAreaView, View, Picker,FlatList, StyleSheet, Text, Button } from 'react-native';
import {getRecipe} from '../components/Fb'
function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

export default class App extends React.Component {
  state = {
      recipe: [],
      title:'',
      id:''
  }

  RecipeList = (list) =>{
    console.log(list)
    this.setState({
      recipe:list
    })
    console.log(this.state.recipe)
  }

  componentDidMount(){
    getRecipe(this.RecipeList)
  }
  test = () =>{
      getRecipe()
      this.setState(prevState => ({
        recipe: [...prevState.recipe, {title:this.state.title,
        id:'10'}]
      }));
    console.log(this.state.recipe)
    }
    render(){
    return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.recipe}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  picker:{
    paddingLeft:100,
    width: 300,
    color:'#C7C7CD',
    textAlign:'center'
  }
});