import React from "react";

import MessageList from "./MessageList"
import MessageForm from "./MessageForm"
import CtxForm from "./CtxForm"
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

  componentDidMount() {
    console.log("In Dashboard - socket is: ")
    console.log(socket)

    socket.on('new-message', (data) => {
        console.log("In client - Received new message from joe to jj - in Dashboard.js webpack version")
        console.log(data)
        this.createMessageFromJoeToJJ(data.id, data.body, data.context, data.urgent, data.customContext)
    })

    socket.on('new-message-from-jj-to-joe', (data) => {
        console.log("In Client - Received new message from jj to joe - in Dashboard.js webpack version")
        console.log(data)
        this.createMessageFromJJToJoe(data.id, data.body, data.context, data.urgent, data.customContext)
    })
  }

  createMessageFromJJToJoe(id, body, context, urgent, customContext) {
    this.setState({
      messages: [
        ...this.state.messages,
        {id: id, user_id: "58a743735adab10011e223d9", body: body, context: context, urgent: urgent, customContext: customContext}
      ]
    })
  }

  createMessageFromJoeToJJ(id, body, context, urgent, customContext) {
    this.setState({
      messages: [
        ...this.state.messages,
        {id: id, user_id: "58b774a20a62350011f83cb3", body: body, context: context, urgent: urgent, customContext: customContext}
      ]
    })
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
      const theConversation = fetch('https://shielded-dusk-72399.herokuapp.com/conversations/58e6e3723c21030011fe4c6c', {credentials: 'same-origin'})
      theConversation.then(loadConvo)
    }

    function loadConvo(data) {
      data.json().then((jsonData) => {
        // console.log("The conversation is: ")
        // console.log(jsonData)
        self.getDataFromConversation(jsonData.user1, jsonData.user2, jsonData.messages)
      })
    }

    function loadMyUsers(data) {
      data.json().then((jsonData) => {
        // console.log("The users are: ")
        // console.log(jsonData)
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
            <MessageForm messages={this.state.messages} />
            <CtxForm onSubmit={this.createMessage.bind(this)} messages={this.state.messages} />
          </div>
        </div>
      </div>
    )
  }
}
