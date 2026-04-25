import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Food } from '../food/shared/food.model';
import { IIntake } from './intake.interface';
import { Intake } from './intake.model';

// ------------- create intake ---------------
export const createIntake = async (
  payload: Partial<IIntake>,
): Promise<IIntake> => {
  // check if the food exists
  const existingFood = await Food.exists({ _id: payload.food });
  if (!existingFood) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Food does not exist');
  }

  const result = await Intake.create(payload);
  return result;
};

export const IntakeServices = {
  createIntake,
};
