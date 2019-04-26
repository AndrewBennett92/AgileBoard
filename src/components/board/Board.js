import React, { Component } from "react";
import uuid from "uuid";
import { DragDropContextProvider, DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import DraggableList from "../DraggableList";

export class Board extends Component {
  state = {
    sections: [
      {
        id: uuid(),
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
        id: uuid(),
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

  moveList = (dragIndex, hoverIndex) => {
    let sections = [...this.state.sections];
    const draggedCard = { ...sections[dragIndex] };
    sections.splice(dragIndex, 1);
    sections.splice(hoverIndex, 0, draggedCard);

    this.setState({
      sections: sections
    });
  };

  render() {
    return (
      <div className="d-flex  mr-4">
        <DragDropContextProvider backend={HTML5Backend}>
          {this.state.sections.map((section, i) => {
            return (
              <DraggableList
                key={section.id}
                id={section.id}
                index={i}
                title={section.name}
                tasks={section.taskItems}
                addTask={this.addTask}
                updateCard={this.updateCard}
                moveList={this.moveList}
              />
            );
          })}
        </DragDropContextProvider>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
