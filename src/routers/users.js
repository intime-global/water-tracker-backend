import { Router } from 'express';

const router = Router();
import {
  getAllParamsControl,
  patchUserParamsControl,
  patchUserPhotoControl,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUsersCard } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

router.get('/', ctrlWrapper(getAllParamsControl));

router.patch(
  '/',
  validateBody(updateUsersCard),
  ctrlWrapper(patchUserParamsControl),
);

router.patch(
  '/avatar',
  upload.single('photo'),
  validateBody(updateUsersCard),
  ctrlWrapper(patchUserPhotoControl),
);

export default router;
