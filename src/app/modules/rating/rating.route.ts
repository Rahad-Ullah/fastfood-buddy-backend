import express from 'express';
import { RatingController } from './rating.controller';

const router = express.Router();

router.get('/', RatingController);

export const ratingRoutes = router;