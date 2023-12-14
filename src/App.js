import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditMode(null);
  };

  const toggleEditMode = (index) => {
    setEditMode(index);
    setEditedTask(tasks[index]);
  };

  const saveEditedTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);
    setEditMode(null);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">Lista de Tareas</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button className="btn btn-primary" onClick={addTask}>
          Agregar
        </button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-center">No tiene tareas pendientes</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {editMode === index ? (
                <input
                  type="text"
                  className="form-control"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                task
              )}
              <div>
                {editMode === index ? (
                  <button className="btn btn-success" onClick={() => saveEditedTask(index)}>
                    Guardar
                  </button>
                ) : (
                  <button className="btn btn-warning me-2" onClick={() => toggleEditMode(index)}>
                    Editar
                  </button>
                )}
                <button className="btn btn-danger" onClick={() => removeTask(index)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
