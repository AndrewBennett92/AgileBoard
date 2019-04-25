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
  editTask = () => {
    this.setState({
      edit: !this.state.edit,
      tempTitle: this.state.edit ? "" : this.props.task.title
    });
  };

  changed = e => {
    this.setState({
      tempTitle: e.target.value
    });
  };

  saveTitleUpdate = e => {
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
    const { description, title } = this.props.task;

    const cardTitle = () => {
      if (this.state.edit) {
        return (
          <form onSubmit={this.saveTitleUpdate}>
            <input
              type="text"
              onSubmit={this.saveTitleUpdate}
              onChange={this.changed}
              value={this.state.tempTitle}
              autoFocus
            />
          </form>
        );
      } else {
        return <div className="title">{title}</div>;
      }
    };
    return (
      <div className="agile-card">
        <div className="d-flex">
          <div className="col-sm-4 status mr-auto" />
          <button onClick={this.editTask} className="edit-icon">
            <i className="fas fa-pencil-alt" />
          </button>
        </div>

        {cardTitle()}

        <div>{description}</div>
      </div>
    );
  }
}

TaskItem.propType = {
  title: PropType.string,
  description: PropType.string
};

export default TaskItem;
