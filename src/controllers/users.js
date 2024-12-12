import { getUserById, updateUserById, getAllParamsUser} from '../services/users.js';
import createHttpError from 'http-errors';

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';


export const userByIdControl = async (req, res, next) => {
    const _id = req.user._id;

    const user = await getUserById(_id);
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found user with id ${_id}!`,
        data: user,
    });
};

export const patchUserParamsControl = async (req, res, next) => {
    const _id = req.user._id;

    const resultPatch = await updateUserById( _id, { ...req.body });
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

export const patchUserPhotoControl = async (req, res, next) => {
    const _id = req.user._id;
    const photo = req.file;
    let photoUrl;

    if (photo) {
            photoUrl = await saveFileToCloudinary(photo);
    }

    const resultPatch = await updateUserById( _id, { ...req.body, photo: photoUrl });
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

export const userAllParamsControl = async (req, res) => {
    const user = await getAllParamsUser();
    res.json({
        status: 200,
        message: 'Successfully found user',
        data: user
    });
};
