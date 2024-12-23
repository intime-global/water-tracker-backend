import { getUserById, updateUserById } from '../services/users.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';

export const patchUserPhotoControl = async (req, res, next) => {
  const _id = req.user._id;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }
  const payload = { photo: photoUrl };
  const resultPatch = await updateUserById({ _id, payload });
  if (!resultPatch) {
    next(createHttpError(404, 'User not found'));
    return;
  }
  res.json({
    status: 200,
    massage: 'Successfully patched a user!',
    data: resultPatch.user,
  });
};

export const getAllParamsControl = async (req, res) => {
  const _id = req.user._id;

  const user = await getUserById(_id);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found all user parameters!`,
    data: user,
  });
};

// функція оновлення юзера

export const patchUserParamsControl = async (req, res, next) => {
  const _id = req.user._id;
  const payload = { ...req.body };

  if (req.body.newPassword) {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      next(createHttpError(400, 'Old and new password are required'));
      return;
    }

    const user = await UsersCollection.findOne({ _id });
    if (!user) {
      next(createHttpError(404, 'User not found.'));
      return;
    }

    const passwordCompare = await bcrypt.compare(oldPassword, user.password);
    if (!passwordCompare) {
      throw createHttpError(400, 'Old Password is invalid');
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    delete payload.oldPassword;
    delete payload.newPassword;
    payload.password = hashPassword;
  }

  const resultPatch = await updateUserById({ _id, payload });
  if (!resultPatch) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    massage: 'Successfully patched a user!',
    data: resultPatch.user,
  });
};
