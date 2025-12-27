import express from 'express';
import { FavouriteController } from './favourite.controller';

const router = express.Router();

router.get('/', FavouriteController);

export const favouriteRoutes = router;