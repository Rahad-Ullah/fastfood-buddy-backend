import express from 'express';
import { AuthProviderController } from './authProvider.controller';

const router = express.Router();

router.get('/', AuthProviderController);

export const authProviderRoutes = router;