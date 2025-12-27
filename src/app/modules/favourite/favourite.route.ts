import express from 'express';
import { FavouriteController } from './favourite.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FavouriteValidations } from './favourite.validation';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

// create favourite
router.post(
  '/create',
  auth(USER_ROLES.USER),
  validateRequest(FavouriteValidations.favouriteSchema),
  FavouriteController.createFavourite
);

// delete favourite
router.delete(
  '/:id',
  auth(USER_ROLES.USER),
  FavouriteController.deleteFavourite
);

// get my favourites
router.get('/me', auth(USER_ROLES.USER), FavouriteController.getMyFavourites);

export const favouriteRoutes = router;