import HttpError from '@wasp/core/HttpError.js'

export const getUserTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Task.findMany({
    where: {
      user: { id: context.user.id }
    },
    orderBy: [
      { priority: 'desc' },
      { dueDate: 'asc' }
    ]
  })
}

export const getTask = async (arg, context) => {
  if (!context.user) { throw new HttpError(401) }
  const task = await context.entities.Task.findUnique({ where: { id: arg.taskId, user: { id: context.user.id } } })
  if (!task) throw new HttpError(404, `Task with id ${arg.taskId} not found`)
  return task
}

export const getSubtasks = async ({ taskId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const task = await context.entities.Task.findUnique({
    where: { id: taskId, userId: context.user.id }
  })

  if (!task) { throw new HttpError(404, 'Task not found.') }

  return context.entities.Subtask.findMany({
    where: { taskId: task.id }
  })
}