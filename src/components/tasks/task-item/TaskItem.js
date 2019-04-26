import React, { Component } from "react";
import PropType from "prop-types";
import "./TaskItem.css";

export class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      tempTitle: ""
    };
  }

  /**
   * Toggles the edit state of the card from what it currently is. Resets any information that might have been
   * input by the user.
   */
  editTask = () => {
    this.setState({
      edit: !this.state.edit,
      tempTitle: this.state.edit ? "" : this.props.task.title
    });
  };

  handleTitleChanged = e => {
    this.setState({
      tempTitle: e.target.value
    });
  };

  saveTitleChanges = e => {
    e.preventDefault();
    this.props.updateTask({
      id: this.props.task.id,
      title: this.state.tempTitle
    });
    this.setState({
      edit: false
    });
  };
  render() {
    const { title } = this.props.task;

    return (
      <div className="agile-card">
        <div className="d-flex">
          <div className="col-sm-4 status mr-auto" />
          <button onClick={this.editTask} className="edit-icon">
            <i className="fas fa-pencil-alt" />
          </button>
        </div>
        {this.state.edit ? (
          <form onSubmit={this.saveTitleChanges}>
            <input
              type="text"
              onSubmit={this.saveTitleChanges}
              onChange={this.handleTitleChanged}
              value={this.state.tempTitle}
              autoFocus
            />
          </form>
        ) : (
          <div className="title">{title}</div>
        )}
      </div>
    );
  }
}

TaskItem.propType = {
  title: PropType.string,
  description: PropType.string,
  updateTask: PropType.func.isRequired
};

export default TaskItem;
