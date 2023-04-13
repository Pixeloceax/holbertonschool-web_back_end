import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    // Create a new queue before each test
    queue = kue.createQueue();
    // Enable test mode without processing the jobs
    queue.testMode.enter();
  });

  afterEach(() => {
    // Clear the queue and exit test mode after each test
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs(null)).toThrowError(
      'Jobs is not an array'
    );
  });

  it('should create a job for each item in the jobs array', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account',
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).toBe(jobs.length);
  });

  it('should create jobs with the correct data', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account',
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    queue.testMode.jobs.forEach((job, index) => {
      expect(job.type).toBe('push_notification_code_3');
      expect(job.data).toEqual(jobs[index]);
    });
  });

  it('should log a message when a job is created', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
    ];
    const consoleSpy = jest.spyOn(console, 'log');
    createPushNotificationsJobs(jobs, queue);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Notification job created: ${expect.any(String)}`
    );
  });

  it('should log a message when a job is completed', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
    ];
    const consoleSpy = jest.spyOn(console, 'log');
    createPushNotificationsJobs(jobs, queue);
    queue.testMode.jobs[0].emit('complete');
    expect(consoleSpy).toHaveBeenCalledWith(
      `Notification job ${expect.any(String)} completed`
    );
  });

  it('should log a message when a job fails', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
    ];
    const consoleSpy = jest.spyOn(console, 'log');
    createPushNotificationsJobs(jobs, queue);
    queue.testMode.jobs[0].emit('failed', 'Something went wrong');
    expect(consoleSpy).toHaveBeenCalledWith(
      `Notification job ${expect.any(String)} failed: Something went wrong`
    );
  });

  it('should log a message when a job makes progress', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
    ];
    const consoleSpy = jest.spyOn(console, 'log');
    createPushNotificationsJobs(jobs, queue);
    queue.testMode.jobs[0].emit('progress', 50);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Notification job ${expect.any(String)} 50% complete`
    );
  });
});
