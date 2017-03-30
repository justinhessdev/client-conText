import React from "react"

export default class NewConversation extends React.Component {
  constructor() {
    super()
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
            <h5 className='text-center'>JJ's Chats:</h5>
          </div>
      </div>
    )
  }
}
