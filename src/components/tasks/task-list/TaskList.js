import React, { Component } from "react";
import TaskItem from "../task-item/TaskItem";
import NewTask from "../task-item/NewTask";

export class TaskList extends Component {
  state = {
    newTaskInProgress: false
  };

  addPlaceholderCard = () => {
    this.setState({
      newTaskInProgress: true
    });
  };

  cancelNewTask = () => {
    this.setState({
      newTaskInProgress: false
    });
  };

  updateTaskItem = updatedTask => {
    this.props.updateCard({ sectionName: this.props.title, card: updatedTask });
  };

  addNewTask = taskName => {
    this.props.addTask({
      listName: this.props.title,
      task: taskName
    });
    this.setState({
      newTaskInProgress: false,
      newTask: {
        title: ""
      }
    });
  };

  render() {
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

        {this.state.newTaskInProgress ? (
          <NewTask addTask={this.addNewTask} cancelTask={this.cancelNewTask} />
        ) : (
          <div className="d-flex justify-content-center">
            <button style={addCardStyle} onClick={this.addPlaceholderCard}>
              +
            </button>
          </div>
        )}
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
