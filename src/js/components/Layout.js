import React from "react";

import Header from "./Header"
import Footer from "./Footer"

export default class Layout extends React.Component {
  constructor() {
    super()
    this.state = {title: "Welcome kidz"}
  }

  render() {
    return (
      <div>
        <Header title={this.state.title}/>
        <Header title={"Hey there"}/>
        <Footer />
      </div>
    );
  }
}
