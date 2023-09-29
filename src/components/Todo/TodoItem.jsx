// src/components/Todo/TodoItem.js
import React from 'react';

const TodoItem = ({ task, markAsCompleted, deleteTask }) => {
  return (
    <li>
      {task}
      <button onClick={markAsCompleted}  className='butun'>Completar</button>
      <button onClick={deleteTask}>Eliminar</button>
    </li>
  );
};

export default TodoItem;
