// src/components/Todo/__tests__/TodoList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../../src/components/Todo/TodoList';

test('renderiza la lista de tareas correctamente', () => {
  // Mock de datos de tareas
  const mockTasks = ['Tarea 1', 'Tarea 2', 'Tarea 3'];

  // Funciones simuladas para marcar como completada y eliminar tarea
  const mockMarkTaskAsCompleted = jest.fn();
  const mockDeleteTask = jest.fn();

  // Renderizar el componente con los datos y funciones simuladas
  render(
    <TodoList
      tasks={mockTasks}
      markTaskAsCompleted={mockMarkTaskAsCompleted}
      deleteTask={mockDeleteTask}
    />
  );

  // Verificar que las tareas se renderizan correctamente
  mockTasks.forEach((task) => {
    expect(screen.getByText(task)).toBeInTheDocument();
  });

  // Verificar que la cantidad de tareas renderizadas es correcta
  expect(screen.getAllByRole('listitem')).toHaveLength(mockTasks.length);
});
