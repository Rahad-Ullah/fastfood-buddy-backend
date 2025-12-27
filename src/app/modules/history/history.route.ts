import express from 'express';
import { HistoryController } from './history.controller';

const router = express.Router();

router.get('/', HistoryController);

export const historyRoutes = router;