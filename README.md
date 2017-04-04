# conText - client application

## we put the text in context


#### Technologies used: REACT | Webpack | Socket.io 


Instructions:

##### Clone the repo:

	git clone https://github.com/justinhessdev/client-conText.git

##### In the terminal:
	
	npm run dev 
	
##### App will be running on 
	
	localhost:8080


React with Webpack implementation is used for the client side application. Socket.IO integration enables live chat feature. 

React components: Dashboard, MessageList, MessageForm, CtxForm, and SelectUserForNewConversation

##### The React Dashboard renders the other Components:

	  render() {
	    return (
	      <div id="dashboard">
	        <div className="row">
	          <div className="col-xs-3">
	             <NewConversation />
	             <SelectUserForNewConversation users={this.state.users} />
	          </div>
	          <div className="col-xs-9">
	            <MessageList messages={this.state.messages} />
	            <MessageForm messages={this.state.messages} />
	            <CtxForm messages={this.state.messages} />
	          </div>
	        </div>
	      </div>
	    )
	  }
