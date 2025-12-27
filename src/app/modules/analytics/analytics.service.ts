import { USER_STATUS } from '../user/user.constant';
import { User } from '../user/user.model';

// ------------- get overview -------------
const getOverview = async () => {
  const [totalUsers, activeUsers] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ status: USER_STATUS.ACTIVE }),
  ]);

  return {
    totalUsers,
    activeUsers,
  };
};

export const AnalyticsServices = {
  getOverview,
};
