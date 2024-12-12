// path to user
import { Router } from 'express';

const router = Router();
import {
    contactAllControl, contactByIdControl, createContactController,
    deleteContactControl, upsertContactControl, patchContactControl
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createUsersSchema, updateUsersSchema } from '../validation/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

router.use(authenticate);
router.get('/', ctrlWrapper(contactAllControl));
router.get('/:id', isValidId, ctrlWrapper(contactByIdControl));
router.post('/', upload.single('photo'), validateBody(createUsersSchema), ctrlWrapper(createContactController));
router.put('/:id', isValidId, upload.single('photo'), validateBody(updateUsersSchema), ctrlWrapper(upsertContactControl));
router.patch('/:id', isValidId, upload.single('photo'), validateBody(updateUsersSchema), ctrlWrapper(patchContactControl));
router.delete('/:id', isValidId, ctrlWrapper(deleteContactControl));
export default router;
