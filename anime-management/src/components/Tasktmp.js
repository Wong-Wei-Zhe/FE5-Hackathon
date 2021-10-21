import React from "react";

const Task = ({ task, toggleComplete, handleDelete }) => {
  return (
    <div className="task">
      <p
        style={{ textDecoration: task.completed && "line-through" }}
        onClick={() => toggleComplete(task)}
      >
        <br></br>
        MAILID: {task.mailid}
        <br></br>
        Episode Wathced: {task.Episode}
      </p>
    </div>
  );
};

export default Task;
