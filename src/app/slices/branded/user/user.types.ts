export interface UserI {
  given_name?: string;
  name?: string
  
  family_name?: string;
  email?: string;
  role?: string;
  email_verified?: boolean;
  picture?: string
  nickname?:string
  sub?: string
  firstName: string
  lastName:string
  
    id: string;

  username?: string;

  auth0Id?: string;
  isAbove18?: boolean;
  privacyAndPolicy?: boolean;

  twoFactorAuth?: boolean;
  isEmailVerified?: boolean;
  subscriptionStatus?: SubscriptionStatus;
  lastLogin?: string;
  createdAt?: string;
}



  
export enum SubscriptionStatus {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM'
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  auth0Id: string;
  isAbove18: boolean;
  privacyAndPolicy: boolean;
  role: string 
  twoFactorAuth: boolean;
  isEmailVerified: boolean;
  subscriptionStatus: SubscriptionStatus;
  lastLogin: string;
  createdAt: string;
}

