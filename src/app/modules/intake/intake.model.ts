import { Schema, model } from 'mongoose';
import { IIntake, IntakeModel } from './intake.interface';
import { IntakeOutcome, IntakeStatus } from './intake.constants';

const intakeSchema = new Schema<IIntake>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    food: {
      type: Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
    outcome: {
      type: String,
      enum: Object.values(IntakeOutcome),
      default: null,
    },
    reaction: {
      type: String,
      trim: true,
      default: null,
    },
    peakValue: {
      type: Number,
      default: null,
    },
    remark: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(IntakeStatus),
      default: IntakeStatus.ONGOING,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Intake = model<IIntake, IntakeModel>('Intake', intakeSchema);
