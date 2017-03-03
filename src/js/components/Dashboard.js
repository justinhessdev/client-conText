import React from "react";

import MessageList from "./MessageList"
import MessageForm from "./MessageForm"
import CtxForm from "./CtxForm"

export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = { messages: [
            {id: 1, user_id: "1", body: "Hey there", context: false, urgent: false, customContext:""},
            {id: 2, user_id: "1", body: "How are you?", context: false, urgent: false, customContext:""},
            {id: 3, user_id: "2", body: "I'm great! Thanks for asking", context: false, urgent: false, customContext:""},
            {id: 4, user_id: "1", body: "😍", context: false, urgent: false, customContext:""}
          ] }
  }

  render() {
    return (
        <div id="dashboard">
           <div className="row">
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
