import { restaurantRoutes } from '../app/modules/restaurant/restaurant.route';
import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { foodRoutes } from '../app/modules/food/food.route';
const router = express.Router();

const apiRoutes: { path: string; route: any }[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  { path: '/restaurants', route: restaurantRoutes },
  {
    path: '/foods',
    route: foodRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
