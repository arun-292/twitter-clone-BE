import { Router } from 'express';
import { signUp, signIn, validate } from './users.controllers';
import { oneOf, body } from 'express-validator';
const router: Router = Router();

router.post(
  '/signup',
  body('name').isLength({ min: 3 }),
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

router.post('/validate', validate);

router.post(
  '/signin',
  oneOf(
    [
      body('name').isLength({ min: 3 }),
      body('email').isEmail(),
      body('phone').isMobilePhone('en-IN'),
    ],
    { message: 'Please Fill Out All Fields Of Your Billing Address' },
  ),
  signIn,
);

export default router;
