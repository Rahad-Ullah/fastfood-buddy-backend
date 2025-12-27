import express from 'express';
import { FavouriteController } from './favourite.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FavouriteValidations } from './favourite.validation';

const router = express.Router();

// create favourite
router.post(
  '/create',
  auth(),
  validateRequest(FavouriteValidations.favouriteSchema),
  FavouriteController.createFavourite
);

// delete favourite
router.delete(
  '/:id',
  auth(),
  FavouriteController.deleteFavourite
);

export const favouriteRoutes = router;