import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {getUsers} from '../components/Fb';

 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      query: '',
    };
  }

    userList = (userList) =>{
        this.setState({
            Users:userList
        })
    console.log(userList)
  }

  componentDidMount() {
     getUsers(this.userList)
  }
  findFilm(query) {
    if (query === '') {
      return [];
    }
 
    const { Users } = this.state;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered film array according the query from the input
    return Users.filter(Users => Users.Name.search(regex) >= 0);
  }
 
  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
 
    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={true}
          containerStyle={styles.autocompleteContainer}
          //data to show in suggestion
          data={films.length === 1 && comp(query, films[0].Name) ? [] : films}
          //default value if you want to set something in input
          defaultValue={query}
          /*onchange of the text changing the state of the query which will trigger
          the findFilm method to show the suggestions*/
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter the film title"
          renderItem={({ item }) => (
            //you can change the view you want to show in suggestion from here
            <TouchableOpacity onPress={() => this.setState({ query: item.title })}>
              <Text style={styles.itemText}>
                {item.Name} ({item.Contact})
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            <Text style={styles.infoText}>{this.state.Name}{this.state.Phone}</Text>
          ) : (
            <Text style={styles.infoText}>Enter The Film Title</Text>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
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
export default App;