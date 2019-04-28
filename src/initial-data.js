import uuid from "uuid";
const sections = [
  {
    id: uuid(),
    name: "Backlog",
    taskItems: [
      {
        id: uuid(),
        title: "Add option to filter customers list by date of birth",
        description: "task desc this needs to be longer"
      },
      {
        id: uuid(),
        title: "Add confirmation dialog for deleting a customer",
        description: "task desc 2"
      },
      {
        id: uuid(),
        title: "Create avatar component for customers",
        description: "task desc 3"
      }
    ]
  },
  {
    id: uuid(),
    name: "In Progress",
    taskItems: [
      {
        id: uuid(),
        title: "progress task 1",
        description: "task desc this needs to be longer"
      },
      {
        id: uuid(),
        title: "progress task 2",
        description: "task desc 2"
      }
    ]
  },
  {
    id: uuid(),
    name: "On Hold",
    taskItems: []
  },
  {
    id: uuid(),
    name: "Done",
    taskItems: []
  }
];

export default sections;
