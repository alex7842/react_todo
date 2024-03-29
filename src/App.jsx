

import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
   
    if (savedTasks) {
    
      setItems(JSON.parse(savedTasks));
      console.log(JSON.parse(savedTasks));
    }
   

  }, []);


  function addTask() {
    const taskInput = document.getElementById('btn');
    const newTask = taskInput.value.trim();
    if (newTask !== '') {
      setItems(prevItems => [...prevItems, newTask]);
    localStorage.setItem('tasks', JSON.stringify(items));
      taskInput.value = '';
    }
  }

  function delTask(index) {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
   localStorage.setItem('tasks', JSON.stringify(items));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      setItems(prevItems => {
        const updatedItems = [...prevItems];
        [updatedItems[index], updatedItems[index - 1]] = [updatedItems[index - 1], updatedItems[index]];
        return updatedItems;
      });
    localStorage.setItem('tasks', JSON.stringify(items));
    }
  }

  function moveTaskDown(index) {
    if (index < items.length - 1) {
      setItems(prevItems => {
        const updatedItems = [...prevItems];
        [updatedItems[index], updatedItems[index + 1]] = [updatedItems[index + 1], updatedItems[index]];
        return updatedItems;
      });
      localStorage.setItem('tasks', JSON.stringify(items));
    }
  }

  return (
    <>
      <h1 className='h1'>To-Do List</h1>
      <br></br>
      <div className='input'>
        <input type='text' id="btn" placeholder='Enter task' />
        <button onClick={addTask}>Add</button>
      </div>
      <br></br>
      <table className='task-table'>
  <thead>
    <tr>
    <th>S.no</th>

      <th>Task</th>
      <th>Action</th>


    </tr>
  </thead>
  <tbody>
    {items.map((task, index) => (
      <tr key={index}>
         <td>{index+1}</td>
        <td className='td'>{task}</td>
        <td>
          <button onClick={() => delTask(index)} style={{backgroundColor:"red"}}>Delete</button>
          <button onClick={() => moveTaskUp(index)}>Task ☝️ </button>
          <button onClick={() => moveTaskDown(index)}>Task 👇</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </>
  );
}

export default App;
