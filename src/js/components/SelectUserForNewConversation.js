import React from "react";

export default class SelectUserForNewConversation extends React.Component{

  constructor() {
    super()
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

      if(u.local.name=="Joe") {
        return (
          <div key={u._id}>
            <div className="row">
              <hr style={pStyle}></hr>
              <div className="col-xs-3 col-xs-offset-2">
                <button style={bStyle} type="button" className="btn btn-default pull-right" aria-label="Left Align">
                </button></div>
              <div style={dStyle} className="col-xs-6">
                <p className="">{u.local.name}</p>
              </div>
            </div>
        </div>
        )
      }
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
