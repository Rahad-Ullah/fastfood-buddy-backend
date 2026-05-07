import express from 'express';
import { BuddyInsightController } from './buddyInsight.controller';

const router = express.Router();

router.get('/', BuddyInsightController);

export const buddyInsightRoutes = router;