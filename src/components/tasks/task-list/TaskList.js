import React, { Component } from "react";
import TaskItem from "../task-item/TaskItem";
import styled from "styled-components";
import NewTask from "../task-item/NewTask";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border-radius: 2px;
  width: 350px;
  background-color: #82a0bc;
  color: #fffbfe;
  min-height: 100px;
  padding-bottom: 10px;
`;
const Title = styled.h4`
  padding: 8px;
`;

const Tasks = styled.div`
  padding: 8px;
`;

const AddTask = styled.div`
  display: flex;
  justify-content: center;
`;

class TaskList extends Component {
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
        <Draggable
          draggableId={this.props.id}
          index={this.props.index}
          type="column"
        >
          {provided => (
            <Container {...provided.draggableProps} ref={provided.innerRef}>
              <Title {...provided.dragHandleProps}>{this.props.title}</Title>
              <Droppable droppableId={this.props.id} type="task">
                {provided => (
                  <Tasks ref={provided.innerRef} {...provided.droppableProps}>
                    {this.props.tasks.map((task, index) => (
                      <TaskItem
                        key={task.id}
                        index={index}
                        task={task}
                        updateTask={this.updateTaskItem}
                      />
                    ))}
                    {provided.placeholder}
                  </Tasks>
                )}
              </Droppable>
              {this.state.newTaskInProgress ? (
                <NewTask
                  addTask={this.addNewTask}
                  cancelTask={this.cancelNewTask}
                />
              ) : (
                <AddTask>
                  <button
                    style={addCardStyle}
                    onClick={this.addPlaceholderCard}
                  >
                    +
                  </button>
                </AddTask>
              )}
            </Container>
          )}
        </Draggable>
      </div>
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
  outline: "none",
  marginBottom: "10px"
};

export default TaskList;
