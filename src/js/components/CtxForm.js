import React from "react"

export default class CtxForm extends React.Component {
  constructor() {
    super()
    this.state = {
      urgentClickCount: 0,
      isUrgent: false,
      value: 'blank'
    }
  }

    // handel when user clicks close.. hide context form and show original input form
    handleClose() {
      this.setState({isUrgent: false, value: 'blank'})
      this.refs.ctxMessage.value = ''
      $('#ctx-form').hide()
      $('#ctxBorder').removeClass('red')
      $('#message-form').show()
    }

  render() {
    return (
      <div id='ctx-form'>
        <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div id="ctxBorder">
                  <label htmlFor="ctx-area">What do you want to talk about?</label>
                  <textarea className="form-control"  id="ctx-area" ref='ctxMessage' rows="2"></textarea>
                  <br></br>
                  <label htmlFor="ctxSelect">Send custom context</label>
                  <select id="ctxSelect" value={this.state.value} onChange={this.handleChange}>
                    <option value="blank" ></option>
                    <option value="thinking">Thinking of you</option>
                    <option value="love">Love you</option>
                    <option value="miss">Miss you</option>
                    <option value="hurt">Feelings hurt</option>
                    <option value="upset">I am upset</option>
                    <option value="upset-you">I am upset at you</option>
                    <option value="angry">I am angry</option>
                    <option value="angry-you">I am angry at you</option>
                    <option value="ignore">I am ignoring you</option>
                    <option value="food">I want food</option>
                  </select>
                  <br></br>
                  <label htmlFor="urgent">Make it urgent</label>
                  <button id="urgentButton" type="button" className="btn btn-default" onClick={this.handleUrgent}>Urgent</button>
                  <button id="sendContextButton" type="button" className="btn btn-primary pull-right" onClick={this.handleSubmit}>Send</button>
                  <button type="button" className="btn btn-default pull-right" onClick={this.handleClose}>Close</button>
                </div>

        </div>
        </form>
      </div>
    )
  }
}

// const CtxForm = React.createClass({
//
//   getInitialState: function() {
//     return {
//       urgentClickCount: 0,
//       isUrgent: false,
//       value: 'blank'
//     }
//   },
//
//   handleSubmit: function(evt) {
//     var cc = $("#ctxSelect option:selected").text()
//     evt.preventDefault()
//
//
//         var self = this
//         var id
//
//     const sendSearch = fetch('/messages', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         _author: self.props.currentUser,
//          to: self.props.sendTo,
//          body: self.refs.ctxMessage.value,
//          context: true,
//          urgent: self.state.isUrgent,
//          customContext: cc
//       })
//     })
//
//
//     function loadMyMessage(data) {
//       data.json().then((jsonData) => {
//         // console.log("The message we received from server is: ")
//         // console.log(jsonData)
//         id = jsonData._id
//         // console.log(id);
//         var customctx = $("#ctxSelect option:selected").text()
//         self.props.onSubmit(id, self.refs.ctxMessage.value, true, self.state.isUrgent, customctx)
//         self.refs.ctxMessage.value = ''
//         self.setState({isUrgent: false, value: 'blank'})
//         $('#ctxBorder').removeClass('red')
//         $('#ctx-form').hide()
//         $('#message-form').show()
//       }).then(patchConversation)
//     }
//
//     function patchConversation() {
//       var ids = []
//       self.props.messages.map((message) => {
//         // console.log(message)
//          ids.push(message.id)
//       })
//
//       // console.log(ids)
//       // console.log("In message form - the current conversation is: ")
//       // console.log(self.props.currentConversation)
//       const patchSearch = fetch('/conversations/'+self.props.currentConversation.id, {
//         method: 'PATCH',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//            user1: self.props.currentConversation.user1._id,
//            user2: self.props.currentConversation.user2._id,
//            messages: ids
//         })
//       })
//     }
//
//     // patchSearch.then(loadPatch)
//     sendSearch.then(loadMyMessage)
//
//
//
//   },
//
//   // change state of select options
//   handleChange: function(event) {
//     this.setState({value: event.target.value})
//   },
//
//   // handel when user clicks close.. hide context form and show original input form
//   handleClose: function(event) {
//     this.setState({isUrgent: false, value: 'blank'})
//     this.refs.ctxMessage.value = ''
//     $('#ctx-form').hide()
//     $('#ctxBorder').removeClass('red')
//     $('#message-form').show()
//   },
//
//   handleUrgent: function() {
//     $('#ctxBorder').toggleClass('red')
//       this.setState({
//         urgentClickCount: this.state.urgentClickCount+1,
//         isUrgent: !this.state.isUrgent
//       })
//   },
//
//   // when i say onSubmit we want to prevent refresh of page from form
//   // we can use the event from the form onsubmit to prevent default behavior
//   render: function() {
//     return (
//       <div id='ctx-form'>
//         <form onSubmit={this.handleSubmit}>
//               <div className="form-group">
//                 <div id="ctxBorder">
//                   <label htmlFor="ctx-area">What do you want to talk about?</label>
//                   <textarea className="form-control"  id="ctx-area" ref='ctxMessage' rows="2"></textarea>
//                   <br></br>
//                   <label htmlFor="ctxSelect">Send custom context</label>
//                   <select id="ctxSelect" value={this.state.value} onChange={this.handleChange}>
//                     <option value="blank" ></option>
//                     <option value="thinking">Thinking of you</option>
//                     <option value="love">Love you</option>
//                     <option value="miss">Miss you</option>
//                     <option value="hurt">Feelings hurt</option>
//                     <option value="upset">I am upset</option>
//                     <option value="upset-you">I am upset at you</option>
//                     <option value="angry">I am angry</option>
//                     <option value="angry-you">I am angry at you</option>
//                     <option value="ignore">I am ignoring you</option>
//                     <option value="food">I want food</option>
//                   </select>
//                   <br></br>
//                   <label htmlFor="urgent">Make it urgent</label>
//                   <button id="urgentButton" type="button" className="btn btn-default" onClick={this.handleUrgent}>Urgent</button>
//                   <button id="sendContextButton" type="button" className="btn btn-primary pull-right" onClick={this.handleSubmit}>Send</button>
//                   <button type="button" className="btn btn-default pull-right" onClick={this.handleClose}>Close</button>
//                 </div>
//
//         </div>
//         </form>
//       </div>
//     )
//   }
// })
