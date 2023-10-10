import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';

export function Stats() {
  const { data: completedTasks, isLoading, error } = useQuery(getCompletedTasks);
  const deleteTaskFn = useAction(deleteTask);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Stats Page</h1>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Completed Tasks</h2>
          {completedTasks.map((task) => (
            <div key={task.id} className='bg-gray-100 p-2 rounded-lg mb-2'>
              <p className='font-semibold'>{task.title}</p>
              <p className='text-sm text-gray-500'>{task.description}</p>
              <button
                onClick={() => deleteTaskFn({ taskId: task.id })}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2'
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className='col-span-3'>
          <h2 className='text-xl font-semibold mb-4'>Task Statistics</h2>
          {/* TODO: Add statistics here */}
        </div>
      </div>
      <div className='mt-4'>
        <Link
          to='/'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}