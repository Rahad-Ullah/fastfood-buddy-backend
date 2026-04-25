import express from 'express';
import { foodRoutes } from '../../app/modules/food/v2/food.route';
import { intakeRoutes } from '../../app/modules/intake/intake.route';
const router_v2 = express.Router();

const apiRoutes: { path: string; route: any }[] = [
  {
    path: '/foods',
    route: foodRoutes,
  },
  {
    path: '/intakes',
    route: intakeRoutes,
  },
];

apiRoutes.forEach(route => router_v2.use(route.path, route.route));

export default router_v2;
