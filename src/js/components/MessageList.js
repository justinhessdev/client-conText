import React from "react"

export default class MessageList extends React.Component {
  render() {
    const messages = this.props.messages.map((m) => {
      var urgentClass, urgentSpan
      if(m.urgent) {
        urgentClass='red'
        urgentSpan='show'
      } else {
        urgentClass='white'
        urgentSpan='hide'
      }

      // console.log(urgentClass)
      if (m.user_id == "58b774a20a62350011f83cb3" && m.context) {
        return (
          <div key={m.id} className="clearfix">
            <div className="bubble">
              <div className={urgentClass}>
                <p><span className={urgentSpan}>URGENT</span>This message has conTEXT</p>
                <p>{m.customContext}</p>
                <p>{m.body}</p>
              </div>
            </div>
          </div>
        )
      } else if(m.user_id == "58b774a20a62350011f83cb3") {
        return (
          <div key={m.id} className="clearfix">
            <p className="bubble">{m.body}</p>
          </div>
        )
      } else if (m.user_id == "58a743735adab10011e223d9" && m.context) {
        return (
          <div key={m.id} className="clearfix">
            <div className="bubble bubble--alt">
              <div className={urgentClass}>
                <p><span className={urgentSpan}>URGENT</span>This message has conTEXT</p>
                <p>{m.customContext}</p>
                <p>{m.body}</p>
              </div>
            </div>
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
      padding: '10px',
      height: '400px',
      overflowY: 'scroll'
    }

    return (

        <div style={divStyle} id="message-list">
          <br></br>
          {messages}
        </div>

    )
  }
}
