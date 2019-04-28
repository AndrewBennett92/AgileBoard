import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskList from "../tasks/task-list/TaskList";
import initialData from "../../initial-data";
import uuid from "uuid";

export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: initialData,
      addLane: false,
      newLaneTitle: ""
    };
  }

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

  onDragEnd = result => {
    const { destination, source, type, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      const columns = Array.from(this.state.sections);
      const columnId = this.state.sections.findIndex(section => {
        if (section.id === draggableId) return true;
        return false;
      });
      const copyCol = { ...columns[columnId] };
      columns.splice(source.index, 1);
      columns.splice(destination.index, 0, copyCol);

      const newState = {
        ...this.state,
        sections: columns
      };
      this.setState(newState);
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      const sections = [...this.state.sections];
      const sectionIndex = sections.findIndex(section => {
        if (section.id === source.droppableId) return true;
        return false;
      });
      const column = sections[sectionIndex];
      const newTaskIds = Array.from(column.taskItems);
      const draggedTask = { ...newTaskIds[source.index] };

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggedTask);
      sections[sectionIndex].taskItems = newTaskIds;

      this.setState({
        sections: sections
      });
      return;
    }

    // When columns are different
    const sections = [...this.state.sections];

    // Find the section column index for the starting point
    const startSectionIndex = sections.findIndex(section => {
      if (section.id === source.droppableId) return true;
      return false;
    });
    // Get the actual section
    const startSection = { ...sections[startSectionIndex] };
    // Item that has been dragged
    const draggedItem = startSection.taskItems[source.index];

    // List of tasks on the start section. Remove the item and set the new section object
    const startTaskIds = Array.from(sections[startSectionIndex].taskItems);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startSection,
      taskItems: startTaskIds
    };

    // Find the section column index for the destination point
    const endSectionIndex = sections.findIndex(section => {
      if (section.id === destination.droppableId) return true;
      return false;
    });

    // Get the actual section
    const endSection = { ...sections[endSectionIndex] };

    // List of tasks on the end section. Slot in the new task
    const endTaskIds = Array.from(sections[endSectionIndex].taskItems);
    endTaskIds.splice(destination.index, 0, draggedItem);
    const newEnd = {
      ...endSection,
      taskItems: endTaskIds
    };

    sections[startSectionIndex] = newStart;
    sections[endSectionIndex] = newEnd;

    const newState = {
      ...this.state,
      sections: sections
    };

    this.setState(newState);
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div style={{ marginTop: "20px" }}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: "flex" }}
              >
                {this.state.sections.map((section, index) => (
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
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

export default Board;
