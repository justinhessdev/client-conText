import React from "react";

export default class SelectUserForNewConversation extends React.Component{

  constructor() {
    super()
  }

  loadEmptyConversation(currentUser, user2){

    var self = this

    const startConversation = fetch('https://shielded-dusk-72399.herokuapp.com/conversations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         user1: currentUser,
         user2: user2._id,
         messages: []
      })
    })

    function beginConversation(data) {

      self.props.startConvoWith(user2)
      data.json().then((jsonData) => {
        // console.log("The new conversation is: ")
        // console.log(jsonData)
        self.props.addConversation(jsonData.conversation)

        $('#conversations-list').show()
        $('#users-list').hide()


      })
    }

    startConversation.then(beginConversation)
  }

  render() {

    const users = this.props.users.map((u) => {
      const pStyle = {
          marginTop: '-2px',
          padding: '5px',
      }

      const bStyle = {
        border:'0px solid transparent',
        background: 'gray',
        marginBottom:'10px',
        color: 'white'

      }
      const dStyle = {
        marginRight: '1px',
        color: 'white'
      }

        return (
          <div onClick={() => this.loadEmptyConversation(this.props.currentUser, u)} key={u._id}>
            <div className="row">
              <hr style={pStyle}></hr>
              <div className="col-xs-3 col-xs-offset-2">
                <button style={bStyle} type="button" className="btn btn-default pull-right" aria-label="Left Align">
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button></div>
              <div style={dStyle} className="col-xs-6">
                <p className="">{u.local.name}</p>
              </div>
            </div>
        </div>
        )
    })

    const divStyle = {
      border: "1px solid black",
      width: '100%',
      background: 'gray'
    }

    return (

      <div style={divStyle} id="users-list">
        {users}
      </div>
    )
  }
}
