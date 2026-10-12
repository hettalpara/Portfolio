const taskEvents = require('./events');

taskEvents.on('task-created', (task) => {
  console.log(`[Notification] Handler started at ${new Date().toISOString()}`);

  setTimeout(() => {
    console.log(
      `[Notification] Task "${task.title}" created at ${new Date().toISOString()}`
    );

    console.log(
      `[Notification] Handler completed at ${new Date().toISOString()}`
    );
  }, 2000);
});

taskEvents.on('task-deleted', (task) => {
  console.log(
    `[Notification] Task "${task.title}" was deleted at ${new Date().toISOString()}`
  );
});

taskEvents.on('error', (error) => {
  console.log('[Event Error]', error.message);
});
