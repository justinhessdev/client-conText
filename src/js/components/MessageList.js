import React from "react"

export default class MessageList extends React.Component {
  render() {
    const messages = this.props.messages.map((m) => {

      if(m.user_id == 2) {
        return (
          <div key={m.id} className="clearfix">
            <p className="bubble">{m.body}</p>
          </div>
        )

      } else {
         return (
           <div key={m.id} className="clearfix">
             <p className="bubble bubble--alt">{m.body}</p>
           </div>
         )
      }
    })

    const divStyle = {
      border: "1px solid black",
      marginTop: '5px',
      padding: '10px'
    }

    return (

        <div style={divStyle} id="message-list">
          <br></br>
          {messages}
        </div>

    )
  }
}
