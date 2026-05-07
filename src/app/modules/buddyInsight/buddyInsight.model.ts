import { Schema, model } from 'mongoose';
import { IBuddyInsight, BuddyInsightModel } from './buddyInsight.interface';
import { IntakeOutcome } from '../intake/intake.constants';

const buddyInsightSchema = new Schema<IBuddyInsight, BuddyInsightModel>({
  outcome: { type: String, enum: Object.values(IntakeOutcome), required: true },
  message: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

export const BuddyInsight = model<IBuddyInsight, BuddyInsightModel>(
  'BuddyInsight',
  buddyInsightSchema,
);
