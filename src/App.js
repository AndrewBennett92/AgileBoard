import React from "react";
import "./App.css";
import Board from "./components/board/Board";

import Header from "./components/header/Header";

class App extends React.Component {
  state = {
    loggedInUser: "Andrew"
  };

  render() {
    return (
      <div className="app-container">
        <Header name={this.state.loggedInUser} />
        <Board />
      </div>
    );
  }
}

export default App;
