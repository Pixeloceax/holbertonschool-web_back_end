const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, world!',
};

const job = queue
  .create('push_notification_code', jobData)
  .on('complete', () => console.log('Notification job completed'))
  .on('failed', () => console.log('Notification job failed'))
  .save((err) => {
    if (err) {
      console.error(`Error creating job: ${err}`);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });
