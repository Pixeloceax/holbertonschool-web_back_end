import signUpUser from './4-user-promise.js';
import uploadPhoto from './5-photo-reject.js';

export default async function handleProfileSignup(
  firstName,
  lastName,
  fileName
) {
  await signUpUser(firstName, lastName);
  await uploadPhoto(fileName);
}
