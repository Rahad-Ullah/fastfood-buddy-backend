import express from 'express';
import { FoodController } from './food.controller';

const router = express.Router();

router.get('/', FoodController);

export const foodRoutes = router;