import kue from 'kue';
const queue = kue.createQueue();

function createPushNotificationsJobs(jobs) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((job) => {
    const jobInstance = queue
      .create('push_notification_code_3', job)
      .on('complete', () => {
        console.log(`Notification job ${jobInstance.id} completed`);
      })
      .on('failed', (error) => {
        console.log(`Notification job ${jobInstance.id} failed: ${error}`);
      })
      .on('progress', (progress) => {
        console.log(`Notification job ${jobInstance.id} ${progress}% complete`);
      })
      .save((error) => {
        if (error) {
          console.error(`Error creating notification job: ${error}`);
        } else {
          console.log(`Notification job created: ${jobInstance.id}`);
        }
      });
  });
}

module.exports = createPushNotificationsJobs;
