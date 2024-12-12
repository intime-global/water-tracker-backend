
import { UsersCollection } from '../db/models/user.js';

export const createNewUser = payload => UsersCollection.create(payload);

export const getUserById = async (_id, userId) => {
    const user = await UsersCollection.findOne({ _id, userId: userId });
    return user;
};

// export const deletUserById = async (_id, userId) => {
//     const user = await UsersCollection.findOneAndDelete({ _id, userId: userId });
//     return user;
// };

export const updateUserById = async (_id, userId, payload, options = {}) => {
    const rawResult = await UsersCollection.findOneAndUpdate(
        { _id, userId: userId }, payload,
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

