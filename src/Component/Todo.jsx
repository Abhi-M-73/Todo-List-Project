import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();  // Prevent form submission reload
    if (input.trim()) {
      if (isEditing) {
        // If editing, update the task at the editIndex
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = input;
        setTasks(updatedTasks);
        setIsEditing(false);  // Reset editing state
        setEditIndex(null);
      } else {
        // If not editing, add a new task
        setTasks([...tasks, input]);
      }
      setInput(""); // Clear the input field
    }
  };

  // Delete a task by index
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));  // Remove the task at the specified index
  };

  // Enable editing for a task
  const editTask = (index) => {
    setInput(tasks[index]);  // Set the task value in the input field for editing
    setIsEditing(true);      // Enable editing mode
    setEditIndex(index);     // Save index of the task being edited
  };

  return (
    <section className='todo-container max-w-screen-2xl mx-auto px-32 py-10 shadow-lg text-white rounded-md'>
      <section className='mt-10 bg-red-900 rounded-md px-10 py-5 '>
        <header>
          <h1 className='text-4xl font-semibold text-center'>Todo List</h1>
        </header>
        <section>
          <form onSubmit={addTask} className='mt-10 flex gap-10 '>
            <div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className='todo-input border-2 outline-none border-white bg-transparent px-10 py-2 text-center text-white rounded-md'
                placeholder='Type Your Task'
                autoComplete='off'
              />
            </div>
            <div>
              <button className='border-2 rounded-md px-5 py-2' type='submit'>
                {isEditing ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </section>
      </section>

      <section className='mt-10 bg-violet-700 rounded-md px-10 py-5'>
        <header>
          <h1 className='text-4xl font-semibold text-center'>Added Tasks</h1>
        </header>
        <section>
          <ul className='flex flex-col gap-5 mt-10'>
            {tasks.map((task, i) => (
              <li key={i} className='flex justify-between items-center text-xl border-2 w-full px-5 py-2 rounded-md'>
                <span>{task}</span>
                <div className="flex gap-3">
                  <CiEdit className='cursor-pointer border-2 h-8 w-8 rounded-md' onClick={() => editTask(i)} />
                  <MdDelete className='cursor-pointer border-2 h-8 w-8 rounded-md' onClick={() => deleteTask(i)} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </section>
  );
}

export default Todo;
