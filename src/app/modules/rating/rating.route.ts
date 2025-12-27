import express from 'express';
import { RatingController } from './rating.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RatingValidations } from './rating.validation';

const router = express.Router();

// create rating
router.post(
  '/create',
  auth(USER_ROLES.USER),
  validateRequest(RatingValidations.ratingSchema),
  RatingController.createRating
);

// get all ratings
router.get('/', auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), RatingController.getAllRatings);

export const ratingRoutes = router;