
// TypeScript interfaces based on the schema
export interface ISubscriptionPrice {
  monthly: number;
  annual: number;
}

export interface ISubscription {
  planName: string;
  planType: "Monthly" | "Annual";
  prices: ISubscriptionPrice;
  features: string[]; // List of features for the plan
  adFree: boolean;
  multiplayerAccess: boolean;
  exclusiveContent: boolean;
  offlineDownloads: boolean;
  cloudSaves: boolean;
  createdBy: string;
  updatedBy: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface INewSubscription {
  planName: string;
  planType: "Monthly" | "Annual";
  prices: ISubscriptionPrice;
  features: string[];
  adFree?: boolean;
  multiplayerAccess?: boolean;
  exclusiveContent?: boolean;
  offlineDownloads?: boolean;
  cloudSaves?: boolean;
  active?: boolean;
}
export interface SubscriptionPriceI {
  monthly: number;
  annual: number;
}

export interface SubscriptionResponseI {
  id: string;
  planName: string;
  planType: "Monthly" | "Annual";
  prices: SubscriptionPriceI;
  features: string[];
  adFree: boolean;
  multiplayerAccess: boolean;
  exclusiveContent: boolean;
  offlineDownloads: boolean;
  cloudSaves: boolean;
  createdBy: string;
  updatedBy: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionPayloadI {
  planName: string;
  planType: "Monthly" | "Annual";
  prices: SubscriptionPriceI;
  features: string[];
  adFree?: boolean;
  multiplayerAccess?: boolean;
  exclusiveContent?: boolean;
  offlineDownloads?: boolean;
  cloudSaves?: boolean;
  active?: boolean;
}



// import { objectId } from "@modules/validate/validation.custom";
// import Joi from "joi";

// // Validation for Subscription ID
// export const subscriptionId = {
//   params: Joi.object().keys({
//     subscriptionId: Joi.custom(objectId).required(), // Validate as a valid ObjectId
//   }),
// };

// // Validation for User ID
// export const userId = {
//   params: Joi.object().keys({
//     userId: Joi.custom(objectId).required(), // Validate as a valid ObjectId
//   }),
// };

// // Validation for Creating Subscription
// export const createSubscription = {
//   body: Joi.object().keys({
//     userId: Joi.custom(objectId).required(), // Required user ID
//     planId: Joi.custom(objectId).required(), // Required plan ID
//     startDate: Joi.date().required(),
//     endDate: Joi.date().required(),
//     isActive: Joi.boolean().required(),
//   }),
// };

// // Validation for Updating Subscription
// export const updateSubscription = {
//   body: Joi.object().keys({
//     planId: Joi.custom(objectId).optional(),
//     startDate: Joi.date().optional(),
//     endDate: Joi.date().optional(),
//     isActive: Joi.boolean().optional(),
//   }),
// };

// // Validation for Query Parameters (Filters)
// export const filterSubscriptions = {
//   query: Joi.object().keys({
//     isActive: Joi.boolean().optional(),
//     userId: Joi.custom(objectId).optional(),
//     startDate: Joi.date().optional(),
//     endDate: Joi.date().optional(),
//   }),
// };

// // Validation for Date Range
// export const dateRange = {
//   query: Joi.object().keys({
//     startDate: Joi.date().required(),
//     endDate: Joi.date().required(),
//   }),
// };