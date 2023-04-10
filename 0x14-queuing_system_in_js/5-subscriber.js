const redis = require('redis');
const client = redis.createClient();

client.subscribe('holberton school channel');

client.on('message', (channel, message) => {
  console.log(`Received message: ${message}`);

  if (message === 'KILL_SERVER') {
    console.log('Unsubscribing and quitting...');
    client.unsubscribe('holberton school channel');
    client.quit();
  }
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});
