// src/components/Todo/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, markTaskAsCompleted, deleteTask }) => {
  return (
    <ul className='List'>
      {tasks.map((task, index) => (
        <TodoItem 
          key={index}
          task={task}
          markAsCompleted={() => markTaskAsCompleted(index)}
          deleteTask={() => deleteTask(index)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
