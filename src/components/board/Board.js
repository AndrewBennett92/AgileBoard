import React, { Component } from "react";
import uuid from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskList from "../tasks/task-list/TaskList";

const getItemStyle = (isDragging, draggableStyle) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "10px",
    borderRadius: "5px",
    margin: "5px",
    backgroundColor: isDragging ? "#0582ca" : "#006494",
    transform: [{ rotateY: "60deg" }],

    // styles we need to apply on draggables
    ...draggableStyle
  };
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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
    ],
    addLane: false,
    newLaneTitle: ""
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

  addLane = e => {
    e.preventDefault();
    this.setState({
      sections: [
        ...this.state.sections,
        { id: uuid(), name: this.state.newLaneTitle, taskItems: [] }
      ],
      addLane: false,
      newLaneTitle: ""
    });
  };

  displayNewLane = e => {
    e.preventDefault();
    this.setState({
      addLane: true,
      newLaneTitle: ""
    });
  };

  handleInput = e => {
    this.setState({
      newLaneTitle: e.target.value
    });
  };

  onDragEnd = result => {
    console.log("called drag end");
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.sections,
      result.source.index,
      result.destination.index
    );

    this.setState({
      sections: items
    });
  };
  render() {
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="droppable"
            type="COLUMN"
            direction="horizontal"
          >
            {provided => (
              <div className="d-flex" ref={provided.innerRef}>
                {this.state.sections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="d-flex flex-column col-sm-2 align-self-start"
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <TaskList
                          key={section.id}
                          id={section.id}
                          index={index}
                          title={section.name}
                          tasks={section.taskItems}
                          addTask={this.addTask}
                          updateCard={this.updateCard}
                          moveList={this.moveList}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {this.state.addLane ? (
          <form onSubmit={this.addLane}>
            <input
              autoFocus
              value={this.state.newLaneTitle}
              onChange={this.handleInput}
            />
            <button onSubmit={this.addLane}>+</button>
          </form>
        ) : (
          <form onSubmit={this.displayNewLane}>
            <button
              style={{ backgroundColor: "transparent", border: "none" }}
              onSubmit={this.displayNewLane}
            >
              Add lane +
            </button>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default Board;
