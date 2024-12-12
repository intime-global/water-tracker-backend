import { SORT_ORDER } from '../constants/index.js';
import { UsersCollection } from '../db/models/user.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllUsers = async (
    { page = 1, perPage = 4, sortOrder = SORT_ORDER.ASC, sortBy = '_id', filter = {}, }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const usersQuery = UsersCollection.find();

    if (filter.gender) {
        usersQuery.where('gender').equals(filter.gender);
    };
    if (filter.userId !== undefined) {
        usersQuery.where('userId').equals(filter.userId);
    };

    const usersCount = await UsersCollection.find().merge(usersQuery).countDocuments();
    const users = await usersQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();
    const paginationData = calculatePaginationData(usersCount, perPage, page);
    return {
        data: users,
        ...paginationData,
    };
};
// getAll повертає - видає весь масив  згідно шаблону описаному в studentsSchema за рах методу find(), findById
export const createNewUser = payload => UsersCollection.create(payload);

export const getUserById = async (id, userId) => {
    const user = await UsersCollection.findOne({ _id: id, userId: userId });
    return user;
};

export const deletUserById = async (id, userId) => {
    const user = await UsersCollection.findOneAndDelete({ _id: id, userId: userId });
    return user;
};

// Для видалення документа з колекції в Mongoose використовується метод:  findOneAndDelete(filter, options, callback)
export const updateUserById = async (id, userId, payload, options = {}) => {
    const rawResult = await UsersCollection.findOneAndUpdate(
        { _id: id, userId: userId }, payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        }
    );
    if (!rawResult || !rawResult.value) return null;
    return {
        user: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

