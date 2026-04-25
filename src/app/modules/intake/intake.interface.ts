import { Model, ObjectId } from 'mongoose';
import { IntakeOutcome, IntakeStatus } from './intake.constants';

export interface IIntake {
  _id: ObjectId;
  user: ObjectId;
  food: ObjectId;
  outcome: IntakeOutcome;
  reaction: string;
  peakValue: number;
  remark: string;
  status: IntakeStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date | null;
}

export type IntakeModel = Model<IIntake>;
