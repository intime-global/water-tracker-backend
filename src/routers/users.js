
import { Router } from 'express';

const router = Router();
import {
    usersAllControl, userByIdControl, createUserController,
    deleteUserControl, upsertUserControl, patchUserControl
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createUsersCard, updateUsersCard } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

// router.use(authenticate);
router.get('/', ctrlWrapper(usersAllControl));
router.get('/:id', isValidId, ctrlWrapper(userByIdControl));
router.post('/', upload.single('photo'), validateBody(createUsersCard), ctrlWrapper(createUserController));
router.put('/:id', isValidId, upload.single('photo'), validateBody(updateUsersCard), ctrlWrapper(upsertUserControl));
router.patch('/:id', isValidId, upload.single('photo'), validateBody(updateUsersCard), ctrlWrapper(patchUserControl));
router.delete('/:id', isValidId, ctrlWrapper(deleteUserControl));
export default router;
