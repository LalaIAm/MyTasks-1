import HttpError from '@wasp/core/HttpError.js'

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { title, description, dueDate, priority, pomodoroEstimate, done, notes, groupId } = args;

  const taskData = {
    title,
    description,
    dueDate,
    priority,
    pomodoroEstimate,
    done: done || false,
    notes,
    userId: context.user.id,
    groupId
  };

  return context.entities.Task.create({
    data: taskData
  });
}

export const updateTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { taskId, title, description, dueDate, priority, pomodoroEstimate, done } = args;

  const task = await context.entities.Task.findUnique({
    where: { id: taskId }
  });

  if (!task) { throw new HttpError(404) }
  if (task.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Task.update({
    where: { id: taskId },
    data: {
      title,
      description,
      dueDate,
      priority,
      pomodoroEstimate,
      done
    }
  });
}

export const createSubtask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { taskId, description } = args;

  const task = await context.entities.Task.findUnique({
    where: { id: taskId }
  });

  if (!task) { throw new HttpError(404) }
  if (task.userId !== context.user.id) { throw new HttpError(403) }

  const newSubtask = await context.entities.Subtask.create({
    data: {
      description,
      task: { connect: { id: taskId } }
    }
  });

  return newSubtask;
}

export const updateSubtask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { subtaskId, description } = args;

  const subtask = await context.entities.Subtask.findUnique({
    where: { id: subtaskId }
  });

  if (!subtask) { throw new HttpError(404) }
  if (subtask.task.user.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Subtask.update({
    where: { id: subtaskId },
    data: { description }
  });
}