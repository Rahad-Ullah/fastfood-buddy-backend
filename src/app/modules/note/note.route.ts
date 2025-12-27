import express from 'express';
import { NoteController } from './note.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import { NoteValidations } from './note.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// create / update note
router.post(
  '/',
  auth(USER_ROLES.USER),
  validateRequest(NoteValidations.noteSchema),
  NoteController.createNote
);

export const noteRoutes = router;