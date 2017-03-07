import React from "react";

import MessageList from "./MessageList"
import MessageForm from "./MessageForm"
import CtxForm from "./CtxForm"
import NewConversation from "./NewConversation"
import ConversationList from "./ConversationList"
import SelectUserForNewConversation from "./SelectUserForNewConversation"

export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
        isLoggedIn: true,
        messages: [
          {id: 1, user_id: "58a39219fc4c98025a646ff1", body: "Hey there", context: false, urgent: false, customContext:""},
          {id: 2, user_id: "58a39219fc4c98025a646ff1", body: "How are you?", context: false, urgent: false, customContext:""},
          {id: 3, user_id: "58a3a774c8a707068b15dd1c", body: "I'm great! Thanks for asking", context: false, urgent: false, customContext:""},
          {id: 4, user_id: "58a39219fc4c98025a646ff1", body: "😍", context: false, urgent: false, customContext:""}
        ],
        users: [],
        conversations: [],
        currentConversation: [],
        startedConversationWith: {},
        currentUser: "",
        to: ""}
  }

  createMessage(id, body, context, urgent, customContext) {

    this.setState({
      isLoggedIn: false,
      messages: [
        ...this.state.messages,
        {id: id, user_id: this.state.currentUser, body: body, context: context, urgent: urgent, customContext: customContext}
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
      to: user2._id
    })

  }

  showConversationListInfo(data) {
    var conversationData = []
    data.map((d) => {
      conversationData.push({id: d._id, user1: d.user1, user2: d.user2})
    })

    this.setState({
      conversations: conversationData
    })
  }

  setCurrentConversation(conversation) {
    this.setState({
      currentConversation: conversation
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

  updateConversationList(conversation) {
    // console.log("I am adding the new converstaion to state conversations: ")
    // console.log(conversation)
    var updateConvoArr = []
    this.state.conversations.map((c) => {
      updateConvoArr.push(c)
    })


    updateConvoArr.push({id:conversation._id, user1: conversation.user1, user2: conversation.user2})

    this.setState({
      conversations: updateConvoArr
    })

    // console.log("There should be a new conversation now: ")
    // console.log("Array size is now: " + this.state.conversations.length)
    // console.log(this.state.conversations)
  }

  startConvoWith(user) {
    this.setState({
      startedConversationWith: user
    })
  }

  render() {
    const divStyle = {
      float: "left"
    }

    return (
      <div id="dashboard">
         <div className="row">
             <div className="col-xs-3">
               <NewConversation showUsersForNewConversation={this.showUsersForNewConversation}/>
               <ConversationList conversations={this.state.conversations} getDataFromConversation={this.getDataFromConversation} currentConversation={this.setCurrentConversation} currentUser={this.state.currentUser} sendTo={this.state.to} startConvoWith={this.state.startedConversationWith}/>
               <SelectUserForNewConversation users={this.state.users} currentUser={this.state.currentUser} addConversation={this.updateConversationList} startConvoWith={this.startConvoWith}/>
           </div>
             <div className="col-xs-9">
              <MessageList messages={this.state.messages} currentUser={this.state.currentUser} />
              <MessageForm onSubmit={this.createMessage} messages={this.state.messages} currentConversation={this.state.currentConversation} currentUser={this.state.currentUser} sendTo={this.state.to}/>
              <CtxForm onSubmit={this.createMessage} messages={this.state.messages} currentConversation={this.state.currentConversation} currentUser={this.state.currentUser} sendTo={this.state.to}/>
            </div>
        </div>
      </div>
      )

  }
}
