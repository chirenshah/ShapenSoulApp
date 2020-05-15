import React from 'react';
import { SafeAreaView,ScrollView, View , StyleSheet, Text, Button , TouchableOpacity} from 'react-native';
import {getRecipe , signout} from '../components/Fb'
import Autocomplete from 'react-native-autocomplete-input';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from "react-native-share";
import RNFetchBlob from 'rn-fetch-blob';
import LoginScreen from './Login'


export default class App extends React.Component {
  state = {
      recipe: [],
      id:'',
      query:'',
      Diet:[],
      selectedRecipe:[]
  }

  RecipeList = (list) =>{
    this.setState({
      recipe:list
    })
  }

  makeDiet = (item) =>{
    this.state.Diet.push(item.Name)
    this.setState({ query: ""})
    const { recipe } = this.state;
    const selectedRecipe = recipe.filter(recipe => recipe.Name.search(item.Name) >= 0);
    this.state.selectedRecipe = selectedRecipe.concat(this.state.selectedRecipe);
  }

  sharePDFWithAndroid(fileUrl, type) {
    RNFetchBlob.fs.readFile(fileUrl, 'base64')
    .then(async (base64Data) => {
    base64Data = `data:${type};base64,` + base64Data;
    await Share.open({ 
    filename:"ZGlldA==",
    title: 'ShapenSoul',
    message: 'Your Diet:',
    url: base64Data });
    // remove the image or pdf from device's storage
    await RNFS.unlink(filePath); 
})
  }

  create = async () => {
    const {selectedRecipe} = this.state
    let final = ""
    selectedRecipe.forEach((item)=>{
    let recipe=`<h1>${item.Name}</h1>
              <p>${item.Value}</p>
              <p>${item.Value}</p>`;
    final += recipe;
    })
    let html = `<head>Shape N Soul </head>
                <body>${final}</body> `
    let options = {
                  html:html,
                  fileName: 'test',
                  directory: 'docs',
              };
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath)
    this.sharePDFWithAndroid(file.filePath,"application/pdf");
  }

  removeItem = (info) =>{
    let {Diet} = this.state;
    let {selectedRecipe} = this.state;
    let data = Diet.indexOf(info);
    Diet = Diet.splice(data,1); 
    selectedRecipe = selectedRecipe.splice(data,1)
    this.forceUpdate();
  }

  componentDidMount(){
    getRecipe(this.RecipeList)
  }
  findUser(query) {
    if (query === '') {
      return [];
    }
    const { recipe } = this.state;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered film array according the query from the input
    return recipe.filter(recipe => recipe.Name.search(regex) >= 0);
  }
  
    render(){
    const { query } = this.state;
    let { Diet } = this.state;
    const Users = this.findUser(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
    <ScrollView style={styles.container}>
      <Button title ="Logout" onclick = {() => {
        signout();
        this.props.navigation.navigate(LoginScreen);
      }
      }/>
      <Autocomplete
          autoCapitalize="none"
          autoCorrect={true}
          containerStyle={styles.autocompleteContainer}
          //data to show in suggestion
          data={Users.length === 1 && comp(query, Users[0].Name) ? [] : Users}
          //default value if you want to set something in input
          defaultValue={query}
          /*onchange of the text changing the state of the query which will trigger
          the findFilm method to show the suggestions*/
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter the Recipe"
          renderItem={({ item }) => (
            //you can change the view you want to show in suggestion from here
            <TouchableOpacity onPress={() =>{
              this.makeDiet(item)
              }
            }>
              <Text style={styles.itemText}>
                {item.Name}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {Diet.length > 0 ? (
            <View>
              {Diet.map(info => 
              <TouchableOpacity key = {() => Math.random.toString()}
              style={
                {backgroundColor:"skyblue",
                padding:20,
              marginTop:10}
              } 
              onPress={()=>{this.removeItem(info)}}>
                <Text>{info}</Text>
              </TouchableOpacity>)}
              <View style={{marginTop:100}}>
                <Button title="Create" onPress={() => {
                  this.create();
                  }}/>
              </View>
            </View>
          ) : (
            <Text style={styles.infoText}>Enter the Recipe</Text>
          )}
        </View>
    </ScrollView>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor:"white"
  },
  autocompleteContainer: {
    paddingTop: 100,
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 4,
    padding:10,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
