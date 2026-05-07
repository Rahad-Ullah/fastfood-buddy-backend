import { Model, ObjectId } from 'mongoose';
import { IntakeOutcome } from '../intake/intake.constants';

export type IBuddyInsight = {
  _id: ObjectId;
  outcome: IntakeOutcome;
  message: string;
  isActive: boolean;
};

export type BuddyInsightModel = Model<IBuddyInsight>;
