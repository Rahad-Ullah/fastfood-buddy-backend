import { Model } from 'mongoose';
import { PackageInterval } from './package.constant';

export interface IPackage {
  _id: string;
  name: string;
  price?: number;
  features: string[];
  interval: PackageInterval;
  androidProductId?: string; // Google Play SKU
  iosProductId?: string; // App Store Product ID
  isDeleted: boolean;
}

export type PackageModel = Model<IPackage>;
