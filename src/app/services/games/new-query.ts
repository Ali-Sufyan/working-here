

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

// export interface IPricing {
//   model: PricingModel;
//   price?: number;
//   currency?: string;
//   subscriptionPlans?: {
//     duration: 'monthly' | 'quarterly' | 'yearly';
//     price: number;
//     currency: string;
//     features?: string[];
//   }[];
//   inGamePurchases?: {
//     enabled: boolean;
//     items?: {
//       id: string;
//       name: string;
//       description: string;
//       price: number;
//       currency: string;
//       category: string;
//     }[];
//   };
// }

// Main Game Interface
export interface IGame {
  title: string;
  slug: string;
  description: string;
  devId:string
  shortDescription: string;

  status: GameStatus;
  releaseDate: Date;
  lastUpdated: Date;
  genres: string[];
  tags: string[];
  features: string[];

  // pricing: IPricing;
  ageRating: AgeRating;
  contentWarnings: string[];

  // Social and Community
  website?: string | undefined;
  socialLinks?:
    | {
        discord?: string | undefined;
        twitter?: string | undefined;
        facebook?: string | undefined;
        youtube?: string | undefined;
        twitch?: string | undefined;
      }
    | undefined;

  // Moderation and Support
  moderationStatus?: {
    isApproved: boolean;
    reviewedAt?: Date;
    reviewedBy?:string
    comments?: string;
  };

  supportEmail?: string;
  supportUrl?: string;

  // SEO and Marketing
  seoMetadata?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };

  // Region Availability
}

export type createGameInput = Omit<IGame, "slug" | "lastUpdated" | "analytics">;

export interface ISystemRequirements {
  gameId:string
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
  createdAt: string;
  updatedAt: string;
}



export interface IGameAsset {
  gameId:string
  type: "screenshot" | "video" | "banner" | "logo" | "cover";
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}


export interface ILocalization {
  gameId:string
  language: string;
  title: string;
  description: string;
  instructions?: string;
  marketingMaterial?: string;
}



export interface IGameVersion {
  gameId: string
  _id: string;
  version: string;
  releaseNotes: string;
  status: GameStatus;
  publishedAt: Date;
  size: number;
  downloadUrl: string;
  changelog: string[];
  isPublic: boolean;
}


// Main Game Interface
export interface ICreateGame {
  isDraft: boolean;
  title: string;
  description: string;
  devId:string

  genres: string[];
  tags: string[];
  features: string[];

  // Social and Community
  website?: string | undefined;
  socialLinks?:
    | {
        discord?: string;
        twitter?: string;
        facebook?: string;
        youtube?: string;
        twitch?: string;
      }
    | undefined;

  ageRating: AgeRating;

  contentWarnings: string[];
  systemRequirements: Omit<ISystemRequirements, "gameId">[];
  versions: Omit<IGameVersion, "gameId" | "publishedAt">;
  assets: Pick<IGameAsset, "type" | "url">[];
}
