
// export interface IGame  {
//   devId:string
//   title: string;
//   description: string;
//   thumbnailUrl: string;
//   gameUrl: string;
//   supportedPlatforms: string[];
//   ageRating: string;
//   status: string;
//   createdAt: Date;
//   updatedAt: Date;
//   version: string;
//   category: string;
//   tags: string[];
//   averageRating: number;
//   totalPlays: number;
//   monetizationType: "free" | "premium" | "freemium";
//   gameSize: number;
//   estimatedPlayTime: string;
//   requirements: {
//     minimum: {
//       os: string[];
//       processor: string;
//       memory: string;
//       graphics: string;
//     };
//     recommended: {
//       os: string[];
//       processor: string;
//       memory: string;
//       graphics: string;
//     };
//   };
// }
























// Enums and Types
export enum GameStatus {
  DRAFT = "draft",
  IN_REVIEW = "in_review",
  PUBLISHED = "published",
  SUSPENDED = "suspended",
  ARCHIVED = "archived",
}

export enum PricingModel {
  FREE = "free",
  PREMIUM = "premium",
  SUBSCRIPTION = "subscription",
  FREE_TO_PLAY = "free_to_play", // With in-game purchases
}

export enum AgeRating {
  E = "E", // Everyone
  E10 = "E10", // Everyone 10+
  T = "T", // Teen
  M = "M", // Mature
  A = "A", // Adult
}

export enum Platform {
  WINDOWS = "windows",
  MACOS = "macos",
  LINUX = "linux",
  ANDROID = "android",
  IOS = "ios",
  WEB = "web",
}

// Interfaces
export interface ISystemRequirements {
  platform: Platform;
  minimum: {
    os: string;
    processor: string;
    memory: string;
    storage: string;
    graphics: string;
    network?: string;
    additionalNotes?: string;
  };
  recommended?: {
    os: string;
    processor: string;
    memory: string;
    storage: string;
    graphics: string;
    network?: string;
    additionalNotes?: string;
  };
}

export interface IGameAsset {
  type: "screenshot" | "video" | "banner" | "logo" | "icon" | "cover";
  url: string;
  file: File;
}

export interface IPricing {
  model: PricingModel;
  price?: number;
  currency?: string;
  subscriptionPlans?: {
    duration: "monthly" | "quarterly" | "yearly";
    price: number;
    currency: string;
    features?: string[];
  }[];
  inGamePurchases?: {
    enabled: boolean;
    items?: {
      id: string;
      name: string;
      description: string;
      price: number;
      currency: string;
      category: string;
    }[];
  };
}

export interface IGameAnalytics {
  totalPlayers: number;
  activeUsers: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  averagePlayTime: number;
  retention: {
    day1: number;
    day7: number;
    day30: number;
  };
  revenue: {
    total: number;
    lastMonth: number;
    currency: string;
  };
  ratings: {
    average: number;
    total: number;
    distribution: {
      "1": number;
      "2": number;
      "3": number;
      "4": number;
      "5": number;
    };
  };
}

export interface ILocalization {
  language: string;
  title: string;
  description: string;
  instructions?: string;
  marketingMaterial?: string;
}

export interface IGameVersion {
  version: string;
  releaseNotes: string;
  publishedAt: Date;
  size: number;
  downloadUrl: string;
  changelog: string[];
  isPublic: boolean;
}

// Main Game Interface
export interface IGame  {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  developer: {
    id: string;
    name: string;
    website?: string;
  };
  publisher: {
    id: string;
    name: string;
    website?: string;
  };
  status: GameStatus;
  releaseDate: Date;
  lastUpdated: Date;
  genres: string[];
  tags: string[];
  features: string[];
  platforms: Platform[];
  systemRequirements: ISystemRequirements[];
  assets: IGameAsset[];
  pricing: IPricing;
  ageRating: AgeRating;
  contentWarnings: string[];
  localizations: ILocalization[];
  versions: IGameVersion[];
  analytics: IGameAnalytics;

  // Social and Community
  website?: string;
  socialLinks?: {
    discord?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    twitch?: string;
  };

  // Moderation and Support
  moderationStatus: {
    isApproved: boolean;
    reviewedAt?: Date;
    reviewedBy?: string;
    comments?: string;
  };
  supportEmail: string;
  supportUrl?: string;

  // SEO and Marketing
  seoMetadata?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };

  // Region Availability
  regionAvailability: {
    regions: string[];
    restrictions?: string[];
    blockedCountries?: string[];
  };
}

