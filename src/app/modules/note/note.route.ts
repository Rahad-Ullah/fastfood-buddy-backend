import express from 'express';
import { NoteController } from './note.controller';

const router = express.Router();

router.get('/', NoteController);

export const noteRoutes = router;