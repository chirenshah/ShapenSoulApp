import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { on , off , send } from '../components/Fb'

export default class Example extends React.Component {
  state = {
    messages: [],
  }

  getuser = () => {
    var user = auth().currentUser
    console.log(user)
    return {
      name:user.displayName,
      _id: user.uid
    }
  }

  componentDidMount() {
    on(message =>
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    })))
  }

  componentWillUnmount(){
    off();
  }


  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={send}
        user={this.user}
      />
    )
  }
}