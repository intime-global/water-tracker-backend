import { SORT_ORDER } from '../constants/index.js';
import { UsersCollection } from '../db/models/users.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllUsers = async (
    { page = 1, perPage = 4, sortOrder = SORT_ORDER.ASC, sortBy = '_id', filter = {}, }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = UsersCollection.find();

    if (filter.contactType) {
        contactsQuery.where('contactType').equals(filter.contactType);
    };
    if (filter.isFavourite !== undefined) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    };
    if (filter.userId !== undefined) {
        contactsQuery.where('userId').equals(filter.userId);
    };

    const contactsCount = await UsersCollection.find().merge(contactsQuery).countDocuments();
    const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };
};
// getAllContacts повертає - видає весь масив студентів згідно шаблону описаному в studentsSchema за рах методу find(), findById
export const createNewUser = payload => UsersCollection.create(payload);

export const getUserById = async (id, userId) => {
    const contact = await UsersCollection.findOne({ _id: id, userId: userId });
    return contact;
};

export const deletUserById = async (id, userId) => {
    const contact = await UsersCollection.findOneAndDelete({ _id: id, userId: userId });
    return contact;
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

