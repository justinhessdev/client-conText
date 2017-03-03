import React from "react"

export default class MessageForm extends React.Component {
    handleSubmit(evt) {
      evt.preventDefault()

      const sendSearch = fetch('/messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _author: this.props.currentUser,
           to: this.props.sendTo,
           body: this.refs.newMessage.value
        })
      })

      var self = this
      var id

      function loadMyMessage(data) {
        data.json().then((jsonData) => {
          // console.log(jsonData);
          id = jsonData._id
          // console.log(id);
          self.props.onSubmit(id, self.refs.newMessage.value, false, false, "")
          self.refs.newMessage.value = ''
        }).then(patchConversation)
      }

      function patchConversation() {
        var ids = []
        self.props.messages.map((message) => {
          // console.log(message)
           ids.push(message.id)
        })

        // console.log(ids)
        // console.log("In message form - the current conversation is: ")
        // console.log(self.props.currentConversation)
        const patchSearch = fetch('/conversations/'+self.props.currentConversation.id, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             user1: self.props.currentConversation.user1._id,
             user2: self.props.currentConversation.user2._id,
             messages: ids
          })
        })
      }

      // patchSearch.then(loadPatch)
      sendSearch.then(loadMyMessage)


    }

    showContextModal() {
       $('#ctx-form').show()
       $('#message-form').hide()
       this.refs.newMessage.value = ''
    }

  render() {
    return (
      <div id='message-form'>
        <br></br>

        <form onSubmit={this.handleSubmit}>
              <label className="sr-only" htmlFor="ex3">send message</label>
              <div className="input-group">
                <input className="form-control" id="ex3" type='text' ref='newMessage' placeholder="send message - press enter"/>
                <div className="input-group-addon" onClick={this.showContextModal}>conTEXT</div>
              </div>
            <button className="btn btn-primary sr-only" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}
