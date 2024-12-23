import { Router } from 'express';
import * as auth from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as vldt from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(vldt.authRegisterSchema),
  ctrlWrapper(auth.registerController),
);

authRouter.post(
  '/confirm-email',
  validateBody(vldt.confirmEmailSchema),
  ctrlWrapper(auth.confirmEmailController),
);

authRouter.post(
  '/login',
  validateBody(vldt.authLoginSchema),
  ctrlWrapper(auth.loginController),
);

authRouter.post('/refresh', ctrlWrapper(auth.refreshSessionController));

authRouter.post('/logout', ctrlWrapper(auth.logoutController));
/* MAIL */
authRouter.post(
  '/send-reset-email',
  validateBody(vldt.requestResetEmailSchema),
  ctrlWrapper(auth.requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(vldt.resetPasswordSchema),
  ctrlWrapper(auth.resetPasswordController),
);
/* GOOGLE OAUTH */
authRouter.get('/get-oauth-url', ctrlWrapper(auth.getGoogleOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(vldt.loginWithGoogleOAuthSchema),
  ctrlWrapper(auth.loginWithGoogleController),
);

export default authRouter;
