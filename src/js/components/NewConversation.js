import React from "react"

export default class NewConversation extends React.Component {
  constructor() {
    super()
  }

  startNewConversation() {
    $('#conversations-list').hide()
    const sendSearch = fetch('https://shielded-dusk-72399.herokuapp.com/usersV2', {
      credentials: 'same-origin'
    })
    var self = this

    function loadMyUsers(data) {
      console.log(data);
      data.json().then((jsonData) => {
        console.log(jsonData)

      })
    }

    sendSearch.then(loadMyUsers)
  }

  render() {

    const bStyle= {
      border:'0px solid transparent'
    }

    const styling = {
      border: '1px solid black',
      padding: '5px',
      marginBottom: '1px',
      marginLeft: '1px',
      marginRight: '1px',
      marginTop: '5px'
    }

    return (
      <div style={styling} className="row">
          <div className='col-md-6 col-md-offset-3'>
            <h5 className='text-center'>Chats</h5>
          </div>
          <div className='col-xs-3'>
            <button style={bStyle} type="button" className="btn btn-default" onClick={this.startNewConversation} aria-label="Left Align">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
          </div>
      </div>
    )
  }
}
