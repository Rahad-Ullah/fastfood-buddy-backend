import express from 'express';
import { foodRoutes } from '../../app/modules/food/v2/food.route';
const router_v2 = express.Router();

const apiRoutes: { path: string; route: any }[] = [
  {
    path: '/foods',
    route: foodRoutes,
  },
];

apiRoutes.forEach(route => router_v2.use(route.path, route.route));

export default router_v2;
