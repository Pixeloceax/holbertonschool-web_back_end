export default function handleResponseFromAPI(promise) {
  return new Promise((resolve, reject) => {
    if (promise) {
      resolve({ status: 200, body: 'success' });
      console.log('Got a response from the API');
    } else {
      reject(Error());
      console.log('Got a response from the API');
    }
  });
}
