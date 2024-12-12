import {
    getAllUsers, getUserById,
    createNewUser, deletUserById, updateUserById
} from '../services/users.js';
import createHttpError from 'http-errors';
import { sortByList } from '../db/models/user.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
// import { parsFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const usersAllControl = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    // const filter = parsFilterParams(req.query);
    // const { _id: userId } = req.user;
    // filter.userId = userId;
    const users = await getAllUsers({
        page, perPage,
        sortBy, sortOrder,
        // filter,
    });
    res.json({
        status: 200,
        message: 'Successfully found users',
        data: users
    });
};

export const createUserController = async (req, res) => {

    const { _id: userId } = req.user;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const user = await createNewUser({ ...req.body, userId, photo: photoUrl });
    res.status(201).json({
        status: 201,
        message: 'Successfully created a user!',
        user,
    });
};

export const userByIdControl = async (req, res, next) => {
    const userId = req.user._id;
    const { id } = req.params;
    const user = await getUserById(id, userId);
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found user with id ${id}!`,
        data: user,
    });
};

export const deleteUserControl = async (req, res, next) => {
    const userId = req.user._id;
    const { id } = req.params;
    const deletcontact = await deletUserById(id, userId);
    if (!deletcontact) {
        next(createHttpError(404, 'User not found'));
        return;
    }
    res.status(204).send(
    );
};
// щоб функція updateContactById могла не тільки оновлювати, але й створювати ресурс при його відсутності, необхідно їй аргументом додатково передати { upsert: true }.
export const upsertUserControl = async (req, res, next) => {
    const userId = req.user._id;
    const { id } = req.params;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }
    const resultUpdate = await updateUserById(id, userId, { ...req.body, photo: photoUrl }, {
        upsert: true,
    });
    if (!resultUpdate) {
        next(createHttpError(404, 'User not found'));
        return;
    }
    const status = resultUpdate.isNew ? 201 : 200;
    res.status(status).json({
        status: 200,
        massage: 'Successfully upserted a user!',
        data: resultUpdate.user,
    });
};
// Оскільки ми вже маємо функцію сервісу updateContactById, але ми не будемо під час виклику нічого передавати третім аргументом options
export const patchUserControl = async (req, res, next) => {
    const userId = req.user._id;
    const { id } = req.params;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const resultPatch = await updateUserById(id, userId, { ...req.body, photo: photoUrl });
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
