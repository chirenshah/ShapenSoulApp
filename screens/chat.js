import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Fire from '../components/chatfb'
import auth from '@react-native-firebase/auth'


export default class Example extends React.Component {
  state = {
    messages: [],
    name:'',
    _id:''
  }

  getuser = () => {
    var user = auth().currentUser
    this.setState({
      name:user.name,
      _id:user.uid
    })
    //console.log("hi" + this.state.name)
  }

  componentDidMount() {
    Fire.shared.on(message =>{
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    })
    )})
    this.getuser()
  }

  componentWillUnmount(){
    Fire.shared.off();
   }


  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user= {{
        name:this.state.name,
        _id:this.state._id,
      }
    }
      />
    )
  }
}