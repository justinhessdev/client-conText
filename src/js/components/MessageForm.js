import React from "react"

export default class MessageForm extends React.Component {

    handleSubmit(evt) {
      evt.preventDefault()

      var self = this
      var id
      var obj

      const sendSearch = fetch('https://shielded-dusk-72399.herokuapp.com/messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _author: "58a743735adab10011e223d9",
           to: "58b774a20a62350011f83cb3",
           body: self.refs.newMessage.value
        })
      })

      function loadMyMessage(data) {
        data.json().then((jsonData) => {
          // console.log(jsonData);
          id = jsonData._id
          // console.log(id);
          obj = {id:id, body:self.refs.newMessage.value, context:false, urgent:false, customContext:""}
          // self.props.onSubmit(id, self.refs.newMessage.value, false, false, "")
          self.refs.newMessage.value = ''
        }).then(patchConversation)
      }

      function patchConversation() {
        var ids = []
        self.props.messages.map((message) => {
          // console.log(message)
           ids.push(message.id)
        })

        ids.push(obj.id)

        // console.log(ids)
        // console.log("In message form - the current conversation is: ")
        // console.log(self.props.currentConversation)
        const patchSearch = fetch('https://shielded-dusk-72399.herokuapp.com/conversations/58b78a67f6fede00110dd21e', {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             user1: "58a743735adab10011e223d9",
             user2: "58b774a20a62350011f83cb3",
             messages: ids
          })
        }).then(emitConversation)
      }

      function emitConversation() {
        console.log("obj is: ")
        console.log(obj)
        console.log("in MessageForm.js - socket is: ");
        console.log(socket);
        socket.emit('send-message-from-jj-to-joe', obj);
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
                <div className="input-group-addon" onClick={this.showContextModal.bind(this)}>conTEXT</div>
              </div>
            <button className="btn btn-primary sr-only" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}
