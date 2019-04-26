import React, { Component } from "react";

export class NewTask extends Component {
  state = {
    title: ""
  };

  handleTaskNameChanged = e => {
    this.setState({
      title: e.target.value
    });
  };

  addCard = e => {
    e.preventDefault();
    this.props.addTask(this.state.title);
    this.setState({ title: "" });
  };

  cancelAddCard = () => {
    this.props.cancelTask();
  };
  render() {
    return (
      <React.Fragment>
        <form action="submit" onSubmit={this.addCard}>
          <input
            autoFocus
            type="text"
            value={this.state.title}
            onSubmit={this.addCard}
            onChange={this.handleTaskNameChanged}
          />
        </form>

        <div className="d-flex mt-2">
          <button className="primary-button" onClick={this.addCard}>
            Add Card
          </button>
          <button style={addCardStyle} onClick={this.cancelAddCard}>
            X
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const addCardStyle = {
  backgroundColor: "#46494c",
  fontWeight: "bold",
  border: "none",
  color: "white",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  margin: "auto",
  borderRadius: "50px",
  width: "35px",
  height: "35px",
  outline: "none"
};

export default NewTask;
