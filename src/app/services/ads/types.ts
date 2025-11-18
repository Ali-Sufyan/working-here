
export enum GeneralStatusE {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
  PROCESSED = "PROCESSED",
  DISABLED = "DISABLED",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
}


export interface IAdPlacement {
  adName: string;
  adType: "banner" | "video" | "interstitial" | "rewarded" | "native";
  platform: "mobile" | "desktop" | "console" | "web";
  //   gameId: string; // ObjectId as a string reference
  placementLocation: "mainMenu" | "levelEnd" | "loadingScreen";
  dimensions: {
    width: number;
    height: number;
  };
  createdBy:string ;
  targetAudience: {
    ageRange: [number, number];
    regions: string[];
    deviceTypes: string[];
  };
  adContent: {
    url: string;
    clickUrl: string;
    ctaText: string;
  };
  priority: number;
  schedule: {
    startDate: Date;
    endDate: Date;
  };
  revenueModel: "CPC" | "CPM" | "CPA" | "FlatRate";
  estimatedRevenue: number;
  impressions: number;
  clicks: number;
  conversionRate: number;
  status: GeneralStatusE;
}

export interface IAdPlacementDoc extends IAdPlacement, Document {}
export interface ICreateAdPlacement {
  adName: string;
  adType: "banner" | "video" | "interstitial" | "rewarded" | "native";
  platform: "mobile" | "desktop" | "console" | "web";
  // gameId: string; // ObjectId as a string reference
  placementLocation: "mainMenu" | "levelEnd" | "loadingScreen";
  dimensions: {
    width: number;
    height: number;
  };
  targetAudience: {
    ageRange: [number, number];
    regions: string[];
    deviceTypes: string[];
  };
  adContent: {
    url: string;
    clickUrl: string;
    ctaText: string;
  };
  priority: number;
  schedule: {
    startDate: Date;
    endDate: Date;
  };
  revenueModel: "CPC" | "CPM" | "CPA" | "FlatRate";
  estimatedRevenue: number;
}
// Interface for Ad Impression
export interface IAdImpression  {
  adId: string; // Reference to the Ad
  userId: string; // User who viewed the ad
  timestamp: Date; // When the impression occurred
}

// Interface for Ad Click
export interface IAdClick  {
  adId: string; // Reference to the Ad
  userId: string; // User who clicked the ad
  timestamp: Date; // When the click occurred
}
