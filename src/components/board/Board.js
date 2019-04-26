import React, { Component } from "react";
import TaskList from "../tasks/TaskList";
import uuid from "uuid";

export class Board extends Component {
  state = {
    sections: [
      {
        name: "Backlog",
        taskItems: [
          {
            id: uuid(),
            title: "task 1",
            description: "task desc this needs to be longer"
          },
          {
            id: uuid(),
            title: "task 2",
            description: "task desc 2"
          },
          {
            id: uuid(),
            title: "task 3",
            description: "task desc 3"
          }
        ]
      },
      {
        name: "In Progress",
        taskItems: [
          {
            id: 1,
            title: "progress task 1",
            description: "task desc this needs to be longer"
          },
          {
            id: 2,
            title: "progress task 2",
            description: "task desc 2"
          }
        ]
      }
    ]
  };

  addTask = task => {
    let sections = [...this.state.sections];
    const updatedSectionList = sections.map(section => {
      if (section.name === task.listName) {
        section.taskItems.push({
          id: uuid(),
          title: task.task,
          description: "boobs"
        });
      }
      return section;
    });
    this.setState({
      sections: updatedSectionList
    });
  };

  updateCard = card => {
    let sections = [...this.state.sections];
    const updatedSectionList = sections.map(section => {
      if (section.name === card.sectionName) {
        section.taskItems = section.taskItems.map(task => {
          if (task.id === card.card.id) {
            task.title = card.card.title;
          }
          return task;
        });
      }
      return section;
    });
    this.setState({
      sections: updatedSectionList
    });
  };

  render() {
    return (
      <div className="d-flex  mr-4">
        {this.state.sections.map(section => {
          return (
            <TaskList
              key={section.name}
              title={section.name}
              tasks={section.taskItems}
              addTask={this.addTask}
              updateCard={this.updateCard}
            />
          );
        })}
      </div>
    );
  }
}

export default Board;
