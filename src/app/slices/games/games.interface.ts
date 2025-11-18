interface ISystemRequirements {
  platform: string;
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

interface IGameAsset {
  type: "screenshot" | "video" | "banner" | "logo" | "cover";
  url: string;
}

export interface IIncomingGameAssets extends IGameAsset{
  _id: string
  createdAt: string
  updatedAt:string
}

interface IGameVersion {
  version: string;
  releaseNotes: string;
  publishedAt: string;
  size: number;
  downloadUrl: string;
  changelog: string[];
  isPublic: boolean;
}



export interface IIncomingGameVersion extends IGameVersion{
  _id: string
  createdAt: string
  updatedAt:string
}
// Main Game Interface
export interface ICreateGame {
  title: string;
  description: string;

  genres: string[];
  features: string[];

  // Social and Community
  socialLinks?: {
    discord?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    twitch?: string;
  };

  ageRating: string;

  contentWarnings: string[];
  systemRequirements: ISystemRequirements[];
  versions: IGameVersion;
  assets: IGameAsset[];
}



interface SocialLinks {
  discord: string;
  twitter: string;
  facebook: string;
  youtube: string;
  twitch: string;
}

interface ModerationStatus {
  isApproved: boolean;
}

interface SeoMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}


export interface IIncomingGame {
  socialLinks: SocialLinks;
  moderationStatus: ModerationStatus;
  seoMetadata: SeoMetadata;
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  status: "draft" | "published" | "archived"; // Use specific status values
  releaseDate: string; // ISO date string
  lastUpdated: string; // ISO date string
  genres: string[];
  tags: string[];
  features: string[];
  ageRating: string;
  contentWarnings: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: string;
}
