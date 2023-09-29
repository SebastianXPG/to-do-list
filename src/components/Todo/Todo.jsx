import React, { Component } from 'react';
import TodoList from './TodoList';
import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksTodo: [],       // Tareas por hacer
      tasksDoing: [],      // Tareas realizando
      tasksCompleted: [],  // Tareas completadas
      newTask: '',
    };
  }

  componentDidMount() {
    // Cargar tareas desde el almacenamiento local o realizar otras tareas de inicialización aquí
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      this.setState({ tasksTodo: storedTasks });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Guardar tareas en el almacenamiento local cuando cambien
    const { tasksTodo, tasksDoing, tasksCompleted } = this.state;
    const tasks = [...tasksTodo, ...tasksDoing, ...tasksCompleted];
    if (tasks !== prevState.tasksTodo) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // Agregar una tarea a la lista "Por Hacer"
  addTask = () => {
    if (this.state.newTask.trim() !== '') {
      this.setState((prevState) => ({
        tasksTodo: [...prevState.tasksTodo, this.state.newTask],
        newTask: '',
      }));
    }
  };

  // Mover una tarea de "Por Hacer" a "Realizando"
  startTask = (index) => {
    const task = this.state.tasksTodo[index];
    this.setState((prevState) => ({
      tasksTodo: prevState.tasksTodo.filter((_, i) => i !== index),
      tasksDoing: [...prevState.tasksDoing, task],
    }));
  };

  // Mover una tarea de "Realizando" a "Completadas"
  completeTask = (index) => {
    const task = this.state.tasksDoing[index];
    this.setState((prevState) => ({
      tasksDoing: prevState.tasksDoing.filter((_, i) => i !== index),
      tasksCompleted: [...prevState.tasksCompleted, task],
    }));
  };

  // Eliminar una tarea de cualquier lista
  deleteTask = (index, listName) => {
    if (listName === 'todo') {
      const updatedTasks = [...this.state.tasksTodo];
      updatedTasks.splice(index, 1);
      this.setState({ tasksTodo: updatedTasks });
    } else if (listName === 'doing') {
      const updatedTasks = [...this.state.tasksDoing];
      updatedTasks.splice(index, 1);
      this.setState({ tasksDoing: updatedTasks });
    } else if (listName === 'completed') {
      const updatedTasks = [...this.state.tasksCompleted];
      updatedTasks.splice(index, 1);
      this.setState({ tasksCompleted: updatedTasks });
    }
  };

  render() {
    return (
      <div className="todo-container">
        <h1 className="todo-title">Tablero de Tareas</h1>
        <div className="kanban-board">
          <div className="kanban-column">
            <h2>Por Hacer</h2>
            <input
              className="todo-input"
              type="text"
              value={this.state.newTask}
              onChange={(e) => this.setState({ newTask: e.target.value })}
            />
            <button className="todo-button" onClick={this.addTask}>
              Agregar Tarea
            </button>
            <div>
            <TodoList
              tasks={this.state.tasksTodo}
              markTaskAsCompleted={this.startTask}
              deleteTask={(index) => this.deleteTask(index, 'todo')}
            />
            </div>
          </div>
          <div className="kanban-column">
            <h2>Realizando</h2>
            <TodoList
              tasks={this.state.tasksDoing}
              markTaskAsCompleted={this.completeTask}
              deleteTask={(index) => this.deleteTask(index, 'doing')}
            />
          </div>
          <div className="kanban-column">
            <h2>Completadas</h2>
            <TodoList
              tasks={this.state.tasksCompleted}
              deleteTask={(index) => this.deleteTask(index, 'completed')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
