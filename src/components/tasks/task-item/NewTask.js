import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  background-color: white;
  margin: 8px;
  margin-top: 0px;
  border-radius: 5px;
`;

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
        <Container>
          <form action="submit" onSubmit={this.addCard}>
            <input
              autoFocus
              type="text"
              value={this.state.title}
              onSubmit={this.addCard}
              onChange={this.handleTaskNameChanged}
              placeholder="Task title"
              style={{ width: "100%" }}
              maxLength="120"
              required
            />
          </form>
        </Container>
        <div className="d-flex m-2">
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
  backgroundColor: "#545e75",
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
