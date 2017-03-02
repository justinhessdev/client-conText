import React from "react"

export default class MessageForm extends React.Component {
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
