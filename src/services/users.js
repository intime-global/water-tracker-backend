
import { UsersCollection } from '../db/models/user.js';

export const getAllParamsUser = async () => {
 const user = await UsersCollection.findOne();
    return user;
};

export const getUserById = async (_id) => {
    const user = await UsersCollection.findOne({ _id });
    return user;
};

export const updateUserById = async (_id, payload, options = {}) => {
    const rawResult = await UsersCollection.findOneAndUpdate(
        { _id }, payload,
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

