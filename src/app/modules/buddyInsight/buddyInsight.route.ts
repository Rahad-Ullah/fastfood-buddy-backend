import express from 'express';
import { BuddyInsightController } from './buddyInsight.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BuddyInsightValidations } from './buddyInsight.validation';

const router = express.Router();

// create buddy insight
router.post(
    '/create',
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    validateRequest(BuddyInsightValidations.createBuddyInsightSchema),
    BuddyInsightController.createBuddyInsight
);

// update buddy insight
router.patch(
    '/:id',
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    validateRequest(BuddyInsightValidations.updateBuddyInsightSchema),
    BuddyInsightController.updateBuddyInsight
);

// delete buddy insight
router.delete(
    '/:id',
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    validateRequest(BuddyInsightValidations.deleteBuddyInsightSchema),
    BuddyInsightController.deleteBuddyInsight
);

export const buddyInsightRoutes = router;