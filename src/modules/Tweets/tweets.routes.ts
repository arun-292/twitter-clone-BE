import { Router } from 'express';
import { create, getAll } from './tweets.controllers';
import { body } from 'express-validator';
const router: Router = Router();

router.post('/create', body('tweetBy').isLength({ min: 3 }), create);

router.get('/getAll', getAll);

export default router;
