// User Information Interface


export enum VerificationStatus {

  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}
export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  auth0Id: string;
  isAbove18: boolean;
  privacyAndPolicy: boolean;
  role: string;
  twoFactorAuth: boolean;
  isEmailVerified: boolean;
  subscriptionStatus: string; // Example options for status
  lastLogin: string; // ISO date string
  createdAt: string; // ISO date string
  id: string;
}

// Developer Profile Interface
export interface IDeveloperProfileFull {
  _id: string;
  userId: IUser; // Link to the IUser interface for nested structure
  companyName: string;
  website: string;
  verificationStatus: VerificationStatus; // Example options for verification status
  commissionRate: number;
  portfolioUrls: string[];
  totalRevenue: number;
  developerRating: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
