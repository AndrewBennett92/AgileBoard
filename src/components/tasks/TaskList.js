import React, { Component } from "react";
import TaskItem from "./TaskItem";

export class TaskList extends Component {
  state = {
    newTask: {
      title: ""
    },
    newTaskInProgress: false
  };

  addPlaceholderCard = () => {
    this.setState({
      newTaskInProgress: true
    });
  };

  addCard = e => {
    e.preventDefault();
    this.props.addTask({
      listName: this.props.title,
      task: this.state.newTask.title
    });
    this.setState({
      newTaskInProgress: false,
      newTask: {
        title: ""
      }
    });
  };

  cancelAddCard = () => {
    this.setState({
      newTaskInProgress: false,
      newTask: {
        title: ""
      }
    });
  };

  newCardTitleChanged = e => {
    this.setState({
      newTask: {
        title: e.target.value
      }
    });
  };

  updateTaskItem = updatedTask => {
    this.props.updateCard({ sectionName: this.props.title, card: updatedTask });
  };

  render() {
    const addCardButton = () => {
      if (this.state.newTaskInProgress) {
        return (
          <div className="d-flex mt-2">
            <button className="primary-button" onClick={this.addCard}>
              Add Card
            </button>
            <button style={addCardStyle} onClick={this.cancelAddCard}>
              X
            </button>
          </div>
        );
      } else {
        return (
          <div className="d-flex justify-content-center">
            <button style={addCardStyle} onClick={this.addPlaceholderCard}>
              +
            </button>
          </div>
        );
      }
    };

    const newCard = () => {
      return (
        <form action="submit" onSubmit={this.addCard}>
          <input
            autoFocus
            type="text"
            value={this.state.newTask.title}
            onChange={this.newCardTitleChanged}
          />
        </form>
      );
    };

    return (
      <div>
        <span style={{ color: "white" }}>{this.props.title}</span>
        {this.props.tasks.map(task => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              updateTask={this.updateTaskItem}
            />
          );
        })}

        {this.state.newTaskInProgress ? newCard() : null}

        {addCardButton()}
      </div>
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

export default TaskList;
