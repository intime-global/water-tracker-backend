import { Router } from 'express';

const router = Router();
import {
  userAllParamsControl,
  patchUserParamsControl,
  patchUserPhotoControl,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUsersCard } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

router.use(authenticate);

router.get('/', ctrlWrapper(userAllParamsControl));

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
