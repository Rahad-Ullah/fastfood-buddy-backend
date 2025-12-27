import { restaurantRoutes } from '../app/modules/restaurant/restaurant.route';
import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { foodRoutes } from '../app/modules/food/food.route';
import { favouriteRoutes } from '../app/modules/favourite/favourite.route';
import { historyRoutes } from '../app/modules/history/history.route';
import { noteRoutes } from '../app/modules/note/note.route';
import { ratingRoutes } from '../app/modules/rating/rating.route';
import { supportRoutes } from '../app/modules/support/support.route';
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
  {
    path: '/favourites',
    route: favouriteRoutes,
  },
  {
    path: '/histories',
    route: historyRoutes,
  },
  {
    path: '/notes',
    route: noteRoutes,
  },
  {
    path: '/ratings',
    route: ratingRoutes,
  },
  {
    path: '/supports',
    route: supportRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
