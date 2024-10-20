import React, { useState, useRef } from 'react';
import axios from 'axios';

function Create({ onTaskAdded }) {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const buttonRef = useRef(null);

  const validateInput = (value) => {
    if (!value.trim()) {
      return 'Task cannot be empty';
    }
    return '';
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      buttonRef.current.click();
    }
  };

  const handleAdd = () => {
    const validationError = validateInput(task);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(''); // Clear any previous error
    axios.post('http://localhost:3001/add', { task })
      .then(result => {
        console.log('Task added successfully:', result.data);
        setTask(''); // Clear the input field after successful submission
        onTaskAdded(result.data); // Update the task list in the parent component
      })
      .catch(err => {
        console.error('Error adding task:', err);
      });
  };

  return (
    <div className='create_form'>
      <input
        type="text"
        placeholder='   ENTER TASK'
        value={task}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setTask(e.target.value);
          setError(''); // Clear the error when user starts typing
        }}
      />
      <button ref={buttonRef} type="button" onClick={handleAdd}>ADD</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Create;
