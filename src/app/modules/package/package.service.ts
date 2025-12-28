import { Types } from "mongoose";
import { IPackage } from "./package.interface";
import { Package } from './package.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

// -- -------------- create package --------------
export const createPackageIntoDB = async (payload: IPackage) => {
  // check if package already exist
  const existingPackage = await Package.exists({ name: payload.name });
  if (existingPackage) {
    throw new ApiError(StatusCodes.CONFLICT, 'Package already exists');
  }

  const result = await Package.create(payload);
  return result;
};

// -------------- update package --------------
const updatePackageIntoDB = async (id: string, payload:Partial<IPackage>)=>{
    // check if package exists
    const existingPackage = await Package.findById(id);
    if (!existingPackage) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Package not found');
    }
    // check if the name already taken
    if (payload.name && payload.name !== existingPackage.name) {
      const nameTaken = await Package.exists({
        name: payload.name,
        _id: { $ne: id },
      });
      if (nameTaken) {
        throw new ApiError(StatusCodes.CONFLICT, 'Package name already in use');
      }
    }
    
    const result = await Package.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const getAllPackagesFromDB = async (type?:string)=>{
    const result = await Package.find(type?{for:type,status:{$ne:'delete'}}:{status:{$ne:'delete'}})
    return result
}

const deletePackageFromDB = async (id:Types.ObjectId)=>{
    const result = await Package.findOneAndUpdate({_id:id},{status:'delete'})
    return result
}

export const PackageService = {
    createPackageIntoDB,
    getAllPackagesFromDB,
    updatePackageIntoDB,
    deletePackageFromDB
}