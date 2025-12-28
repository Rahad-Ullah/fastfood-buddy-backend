import { Types } from "mongoose";
import { IPackage } from "./package.interface";
import { Package } from './package.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

export const createPackageIntoDB = async (payload: IPackage) => {
  // check if package already exist
  const existingPackage = await Package.exists({ name: payload.name });
  if (existingPackage) {
    throw new ApiError(StatusCodes.CONFLICT, 'Package already exists');
  }

  const result = await Package.create(payload);
  return result;
};


const getAllPackagesFromDB = async (type?:string)=>{
    const result = await Package.find(type?{for:type,status:{$ne:'delete'}}:{status:{$ne:'delete'}})
    return result
}

const updatePackageToDB = async (id:Types.ObjectId,payload:Partial<IPackage>)=>{
    const result = await Package.findOneAndUpdate({_id:id},payload,{new:true})
    return result
}

const deletePackageFromDB = async (id:Types.ObjectId)=>{
    const result = await Package.findOneAndUpdate({_id:id},{status:'delete'})
    return result
}

export const PackageService = {
    createPackageIntoDB,
    getAllPackagesFromDB,
    updatePackageToDB,
    deletePackageFromDB
}