


```jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction } from '@wasp/queries';
import { getTask, getSubtasks } from '@wasp/queries/getTask';
import { updateTask } from '@wasp/actions/updateTask';
import { createSubtask } from '@wasp/actions/createSubtask';
import { updateSubtask } from '@wasp/actions/updateSubtask';

export function TaskDetail() {
  const { taskId } = useParams();
  const { data: task, isLoading, error } = useQuery(getTask, { taskId });
  const { data: subtasks, isLoadingSubtasks, errorSubtasks } = useQuery(getSubtasks, { taskId });
  const updateTaskFn = useAction(updateTask);
  const createSubtaskFn = useAction(createSubtask);
  const updateSubtaskFn = useAction(updateSubtask);

  const [taskTitle, setTaskTitle] = useState(task?.title || '');
  const [taskDescription, setTaskDescription] = useState(task?.description || '');

  if (isLoading || isLoadingSubtasks) return 'Loading...';
  if (error || errorSubtasks) return 'Error: ' + (error || errorSubtasks);

  const handleUpdateTask = () => {
    const updatedTask = { id: taskId, title: taskTitle, description: taskDescription };
    updateTaskFn(updatedTask);
  };

  const handleCreateSubtask = () => {
    const newSubtask = { taskId: taskId, description: '' };
    createSubtaskFn(newSubtask);
  };

  const handleUpdateSubtask = (subtaskId, description) => {
    const updatedSubtask = { id: subtaskId, description: description };
    updateSubtaskFn(updatedSubtask);
  };

  return (
    <div className='p-4'>
      <Link to='/' className='text-blue-500'>Back to Dashboard</Link>
      <h1 className='text-3xl font-semibold mb-4'>{task.title}</h1>

      <div className='mb-4'>
        <label htmlFor='title' className='text-lg font-semibold'>Title:</label>
        <input
          type='text'
          id='title'
          className='border rounded p-2 w-full'
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='description' className='text-lg font-semibold'>Description:</label>
        <textarea
          id='description'
          className='border rounded p-2 w-full'
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={handleUpdateTask}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Save Changes
      </button>

      <h2 className='text-2xl font-semibold mt-8 mb-4'>Subtasks</h2>

      {subtasks.map((subtask) => (
        <div key={subtask.id} className='mb-2'>
          <input
            type='text'
            className='border rounded p-2 w-full'
            value={subtask.description}
            onChange={(e) => handleUpdateSubtask(subtask.id, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleCreateSubtask}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Add Subtask
      </button>
    </div>
  );
}
```