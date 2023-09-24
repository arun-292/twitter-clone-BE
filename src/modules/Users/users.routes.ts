import { Router } from 'express';
import { signUp, signIn, validate } from './users.controllers';
import { oneOf, body } from 'express-validator';
const router: Router = Router();

router.post(
  '/signup',
  body('fullName').isLength({ min: 3 }),
  body('userName').isLength({ min: 3 }),
  oneOf(
    [
      body('email', 'enter email').isEmail(),
      body('phone', 'enter correct phone').isMobilePhone('en-IN'),
    ],
    {
      message: 'Please add required',
      errorType: 'grouped',
    },
  ),
  signUp,
);

router.get('/validate/:validator', validate);

router.post(
  '/signin',
  body('validationField').isLength({ min: 3 }),
  body('password').isLength({ min: 3 }),
  signIn,
);

export default router;
