import { CookieOptions, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Users, securePassword } from './users.model';
import jwt from 'jsonwebtoken';
import { addDays } from '../../utils/utilityFunctions';

const signUp = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const user = new Users(req.body);
  if (user.phone === '') user.phone = undefined;

  user
    .save()
    .then(() => {
      return res.json({ done: true });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const validate = (req: Request, res: Response) => {
  Users.findOne({
    $or: [
      { lower_userName: req.params.validator.toLowerCase() },
      { lower_email: req.params.validator.toLowerCase() },
      { phone: req.params.validator },
    ],
  })
    .then((r) => {
      res.status(200).json({ message: 'USER FOUND', userName: r.toJSON().lower_userName });
    })
    .catch(() => {
      res.status(500).json({ message: 'NO USER FOUND' });
    });
};

const signIn = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  Users.findOne({
    $or: [
      { lower_userName: req.body.validationField.toLowerCase() },
      { lower_email: req.body.validationField.toLowerCase() },
      { phone: req.body.validationField },
    ],
  })
    .then((user) => {
      if (securePassword(req.body.password, user.uuid) === user.encryptedPassword) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.cookie('token', token, { expire: addDays(10) } as CookieOptions);
        const { _id, lower_userName: userName, lower_email: email } = user;
        return res.status(200).json({
          token,
          user: {
            _id,
            userName,
            email,
          },
        });
      } else {
        res.status(400).json({
          error: 'Wrong Password',
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'User data does not exist',
      });
    });
};

export { signUp, signIn, validate };
