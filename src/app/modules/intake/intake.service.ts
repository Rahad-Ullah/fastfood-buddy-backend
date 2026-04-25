import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Food } from '../food/shared/food.model';
import { IIntake } from './intake.interface';
import { Intake } from './intake.model';
import { IntakeStatus } from './intake.constants';
import QueryBuilder from '../../builder/QueryBuilder';

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

// ------------ update intake ---------------
export const updateIntake = async (id: string, payload: Partial<IIntake>) => {
  // check if intake exists
  const existingIntake = await Intake.findById(id);
  if (!existingIntake) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Intake not found');
  }

  // handle completed status
  if (payload.status === IntakeStatus.COMPLETED) {
    payload.completedAt = new Date();
  }

  const result = await Intake.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// ------------- get intakes by food id ---------------
export const getIntakesByFoodId = async (
  foodId: string,
  query: Record<string, unknown>,
) => {
  const intakeQuery = new QueryBuilder(
    Intake.find({ food: foodId }).populate(
      'food',
      'name category restaurant isDeleted',
    ),
    query,
  )
    .sort()
    .paginate()
    .fields();

  const [data, pagination] = await Promise.all([
    intakeQuery.modelQuery.lean(),
    intakeQuery.getPaginationInfo(),
  ])
  
  return { data, pagination };
};

export const IntakeServices = {
  createIntake,
  updateIntake,
  getIntakesByFoodId,
};
