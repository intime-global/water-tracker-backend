
import { Router } from 'express';

const router = Router();
import {
     userByIdControl, createUserController, patchUserControl
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createUsersCard, updateUsersCard } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

// router.use(authenticate);
router.get('/:id', isValidId, ctrlWrapper(userByIdControl));
router.post('/', upload.single('photo'), validateBody(createUsersCard), ctrlWrapper(createUserController));
router.patch('/:id', isValidId, upload.single('photo'), validateBody(updateUsersCard), ctrlWrapper(patchUserControl));

export default router;
