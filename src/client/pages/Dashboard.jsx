import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserTasks from '@wasp/queries/getUserTasks';
import { useAction } from '@wasp/actions';
import createTask from '@wasp/actions/createTask';
import updateTask from '@wasp/actions/updateTask';

export function DashboardPage() {
  const { data: tasks } = useQuery(getUserTasks);
  const createTaskFn = useAction(createTask);
  const updateTaskFn = useAction(updateTask);

  if (!tasks) return 'Loading...';

  const handleCreateTask = () => {
    createTaskFn({
      title: 'New Task',
      description: 'New Task Description',
      dueDate: new Date(),
      priority: 1,
      group: null,
    });
  };

  const handleUpdateTask = (taskId) => {
    updateTaskFn({
      id: taskId,
      title: 'Updated Task',
      description: 'Updated Task Description',
      dueDate: new Date(),
      priority: 2,
      group: null,
    });
  };

  return (
    <div className='p-4'>
      <button
        onClick={handleCreateTask}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Task
      </button>
      {tasks.map((task) => (
        <div
          key={task.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{task.title}</div>
          <div>{task.priority}</div>
          <div>
            <button
              onClick={() => handleUpdateTask(task.id)}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Update
            </button>
            <Link
              to={`/task/${task.id}`}
              className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}