import React from "react";

import NavBar from "./NavBar"
import MessageList from "./MessageList"
import MessageForm from "./MessageForm"
import NewConversation from "./NewConversation"
import SelectUserForNewConversation from "./SelectUserForNewConversation"

export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      users: [],
    }
  }

  createMessage(id, body, context, urgent, customContext) {
    this.setState({
      messages: [
        ...this.state.messages,
        {id: id, user_id: "58a743735adab10011e223d9", body: body, context: context, urgent: urgent, customContext: customContext}
      ]
    })
  }

  getDataFromConversation(user1, user2, messages) {
    var newMessages = []
    messages.map((message) => {
      newMessages.push({id: message._id, user_id:message._author._id, body: message.body, context: message.context, urgent: message.urgent, customContext: message.customContext})

    })

    this.setState({
      messages: newMessages,
    })

  }

  showUsersForNewConversation(users) {
    $('#users-list').show()
    var usersArray = []
    users.map((u) => {
      usersArray.push(u)
    })

    this.setState({
      users: usersArray
    })
  }

  componentWillMount() {
    var self = this
    const sendSearch = fetch('https://shielded-dusk-72399.herokuapp.com/usersV2', {credentials: 'same-origin'})

    function getConvo() {
      const theConversation = fetch('https://shielded-dusk-72399.herokuapp.com/conversations/58b78a67f6fede00110dd21e', {credentials: 'same-origin'})
      theConversation.then(loadConvo)
    }

    function loadConvo(data) {
      data.json().then((jsonData) => {
        console.log("The conversation is: ")
        console.log(jsonData)
        self.getDataFromConversation(jsonData.user1, jsonData.user2, jsonData.messages)
      })
    }

    function loadMyUsers(data) {
      data.json().then((jsonData) => {
        console.log("The users are: ")
        console.log(jsonData)
        self.showUsersForNewConversation(jsonData)
      }).then(getConvo)
    }

    sendSearch.then(loadMyUsers)
  }

  render() {
    const divStyle = {
      float: "left"
    }

    return (
      <div id="dashboard">
         <div className="row">
             <div className="col-xs-3">
               <NewConversation />
               <SelectUserForNewConversation users={this.state.users} />
           </div>
             <div className="col-xs-9">
              <MessageList messages={this.state.messages} />
              <MessageForm onSubmit={this.createMessage.bind(this)} messages={this.state.messages} />
            </div>
        </div>
      </div>
    )
  }
}
