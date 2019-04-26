import React, { useImperativeHandle, useRef } from "react";
import TaskList from "./tasks/TaskList";
import { DragSource, DropTarget } from "react-dnd";

const draggableList = React.forwardRef((props, ref) => {
  const containerStyle = {
    backgroundColor: "#006494",
    margin: "5px",
    padding: "10px",
    borderRadius: "5px",
    opacity: props.isDragging ? 0 : 1
  };

  const elementRef = useRef(ref);
  props.connectDragSource(elementRef);
  props.connectDropTarget(elementRef);
  useImperativeHandle(ref, () => ({
    getNode: () => elementRef.current
  }));
  return (
    <div
      ref={elementRef}
      style={containerStyle}
      className="d-flex flex-column col-sm-2 align-self-start"
    >
      <TaskList {...props} />
    </div>
  );
});

export default DropTarget(
  "list",
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }

      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }
      // const dragIndex = monitor.getItem().id;
      // const hoverIndex = props.id;
      // Don't replace items with themselves
      // if (dragIndex === hoverIndex || monitor.getItem().index === props.index) {
      //   return;
      // }

      props.moveList(monitor.getItem().index, props.index);

      monitor.getItem().index = props.index;
      monitor.getItem().id = props.id;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    "list",
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(draggableList)
);
