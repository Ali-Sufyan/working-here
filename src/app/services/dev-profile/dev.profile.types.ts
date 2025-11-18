

export interface IDeveloperProfile {
  userId: string;
  companyName: string;
  website?: string | undefined;
  verificationStatus: string;

  commissionRate?: number | undefined;

  portfolioUrls: string[];
  totalRevenue: number;
  developerRating: number;
}

export interface ICreateDeveloperProfile {
  companyName: string;
  website?: string;
  portfolioUrls: string[];
}

export type TUpdateDeveloperProfile = Partial<ICreateDeveloperProfile>;
export interface IDevData{
  countryOfResidence: string;
  taxIdentificationNumber: string;
  taxIdentificationType: string;
  website: string;
  companyName: string;
  portfolioUrls: string[];

  bankName: string;
  accountNumber: string;
  accountName: string;
  swiftCode?: string | undefined;
}