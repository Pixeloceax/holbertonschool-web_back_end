const express = require('express');
const Redis = require('redis');
const Kue = require('kue');
const { promisify } = require('util');

const redisClient = Redis.createClient();
const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);

const queue = Kue.createQueue();

const app = express();
const port = 1245;

const availableSeats = 50;
let reservationEnabled = true;

async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const result = await getAsync('available_seats');
  return result ? parseInt(result) : availableSeats;
}

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }

    res.json({ status: 'Reservation in process' });
  });

  job.on('complete', (result) => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  if (numberOfAvailableSeats === 0) {
    reservationEnabled = false;
    return;
  }

  const newNumberOfAvailableSeats = numberOfAvailableSeats - 1;
  try {
    await reserveSeat(newNumberOfAvailableSeats);
    if (newNumberOfAvailableSeats >= 0) {
      queue.process('reserve_seat', async (job, done) => {
        if (newNumberOfAvailableSeats >= 0) {
          done();
        } else {
          done(new Error('Not enough seats available'));
        }
      });
    }
  } catch (err) {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
