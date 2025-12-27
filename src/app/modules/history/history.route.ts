import express from 'express';
import { HistoryController } from './history.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { HistoryValidations } from './history.validation';

const router = express.Router();

// create history
router.post(
  '/create',
  auth(USER_ROLES.USER),
  validateRequest(HistoryValidations.historySchema),
  HistoryController.createHistory
);

export const historyRoutes = router;