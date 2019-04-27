import React, { Component } from "react";
import TaskItem from "../task-item/TaskItem";
import NewTask from "../task-item/NewTask";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "10px",
  borderRadius: "5px",
  margin: "5px",
  backgroundColor: isDragging ? "#0582ca" : "#006494",

  // styles we need to apply on draggables
  ...draggableStyle
});

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

  onDragEnd = () => {
    console.log("drag end");
  };

  render() {
    return (
      <div>
        <span style={{ color: "white" }}>{this.props.title}</span>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="task" type="column" direction="vertical">
            {provided => (
              <div ref={provided.innerRef}>
                {this.props.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <TaskItem
                          key={task.id}
                          task={task}
                          updateTask={this.updateTaskItem}
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
