import { uploadPhoto, createUser } from './utils.js';

export default async function asyncUploadUser() {
  try {
    let photo = await uploadPhoto();
    let user = await createUser();

    return { photo, user };
  } catch (error) {
    return { photo: null, user: null };
  }
}
