/*
    Role and Permissions
*/
export const allPermissions = {
  // Admin Level Permissions
  SuperAdmin: "superAdmin",
  Admin: "admin",

  // Role Management
  Roles: {
    Create: "createRoles",
    GetAll: "getAllRoles",
    Get: "getRoles",
    Update: "updateRoles",
    Delete: "deleteRoles",
  },

  // Game Developer Permissions
  Games: {
    Upload: "uploadGames",
    Update: "updateGames",
    Delete: "deleteGames",
    GetOwn: "getOwnGames", // Get developer's own games
    GetAll: "getAllGames", // Admin/Staff permission
    Publish: "publishGames", // Make game live
    Unpublish: "unpublishGames", // Take game offline
    Monetize: "monetizeGames", // Set pricing, in-app purchases
    Analytics: "analyzeGames", // View game performance metrics
  },

  // User Gaming Permissions
  Gaming: {
    Play: "playGames", // Basic user permission
    SaveProgress: "saveProgress",
    Leaderboard: "accessLeaderboard",
    Achievements: "manageAchievements",
    UserProfile: "manageProfile",
    PurchaseCredits: "purchaseCredits",
  },

  // Game Moderation
  Moderation: {
    ReviewGames: "reviewGamesModeration", // Staff review submitted games
    ApproveGames: "approveGamesModeration", // Approve games for publication
    FlagContent: "flagContentModeration", // Flag inappropriate content
    ModerateComments: "moderateCommentsModeration",
    BanUsers: "banUsersModeration",
    UnbanUsers: "unbanUsersModeration",
  },

  // Transactions & Payments
  Payments: {
    ProcessPayments: "processPayments",
    RefundPayments: "refundPayments",
    ViewTransactions: "viewTransactionsPayments",
    ManageSubscriptions: "manageSubscriptionsPayments",
    RevenueSplit: "manageRevenueSplitPayments", // Handle revenue sharing with developers
  },

  // Content Management
  Content: {
    ManageCategories: "manageCategoriesContent",
    ManageTags: "manageTagsContent",
    ManageFeatured: "manageFeaturedContent", // Control featured games
    ManagePromotions: "managePromotionsContent", // Handle game promotions
  },

  // User Management
  Users: {
    Get: "getUsers",
    GetAll: "getAllUsers",
    Update: "updateUsers",
    Delete: "deleteUsers",
    ManageRoles: "manageRolesForUsers",
    ViewActivity: "viewActivityForUsers",
  },

  // Developer Management
  Developers: {
    Approve: "approveDevelopers", // Approve developer applications
    Revoke: "revokeAccessForDevelopers", // Revoke developer privileges
    ManageTeams: "manageTeamsForDevelopers",
    ViewAnalytics: "viewAnalyticsForDevelopers",
  },

  // Staff Management
  Staffs: {
    Create: "createStaffs",
    Update: "updateStaffs",
    Delete: "deleteStaffs",
    AssignTasks: "assignTasksToStaffs",
    ViewPerformance: "viewPerformanceForStaffs",
    Get: "getStaffs",
    GetAll: "getAllStaffs",
  },

  // Communication
  Communication: {
    SendNotifications: "sendNotifications",
    ManageAnnouncements: "manageAnnouncements",
    ModerateChat: "moderateChat",
  },
  Tickets: {
    View: "viewSupportTickets",
    Respond: "respondToTickets",
    Escalate: "escalateTickets",
    Close: "closeTickets",
  },

  // Analytics & Reporting
  Analytics: {
    ViewPlatformStats: "viewPlatformAnalytics",
    ViewFinancials: "viewFinancialAnalytics",
    ExportData: "exportAnalytics",
    CustomReports: "createCustomAnalytics",
  },

  // System Configuration
  System: {
    UpdateSettings: "updateSystem",
    ManageIntegrations: "manageIntegrationsForSystem",
    ViewLogs: "viewLogsForSystem",
    ManageBackups: "manageBackupsForSystem",
    ManageAPI: "manageAPIAccessForSystem",
  },

  // Security
  Security: {
    ManagePermissions: "managePermissionsSecurity",
    AuditLogs: "viewAuditLogsSecurity",
    ManageSecurity: "manageSecuritySettingsSecurity",
  },
  // staffs

  // chats
  Chats: {
    Get: "getChats",
    Create: "createChats",
    GetAll: "getAllChats",
    Delete: "deleteChats",
    Update: "updateChats",
  },
  Referrals: {
    GetRef: "getReferrals",

    CreateRef: "createReferrals",
    UpdateRef: "updateReferrals",
    DeleteRef: "deleteReferrals",
    GetAllRef: "getAllReferrals",
    ManageRef: "manageReferrals",

    GetRefById: "getIdReferrals",
  }, //adplacements
  AdPlacements: {
    Get: "getAdPlacements",
    Create: "createAdPlacements",
    GetAll: "getAllAdPlacements",
    Delete: "deleteAdPlacements",
    Update: "updateAdPlacements",
  },
  //adimpressions
  AdImpressions: {
    Get: "getAdImpressions",
    Create: "createAdImpressions",
    GetAll: "getAllAdImpressions",
    Delete: "deleteAdImpressions",
    Update: "updateAdImpressions",
  },
  //subscriptions
  Subscriptions: {
    Get: "getSubscriptions",
    Create: "createSubscriptions",
    GetAll: "getAllSubscriptions",
    Delete: "deleteSubscriptions",
    Update: "updateSubscriptions",
  },
  //adclicks
  AdClicks: {
    Get: "getAdClicks",
    Create: "createAdClicks",
    GetAll: "getAllAdClicks",
    Delete: "deleteAdClicks",
    Update: "updateAdClicks",
  },
};



// Role Templates
export const roleTemplates = {
  SuperAdmin: [
    allPermissions.SuperAdmin,
    // Has access to everything
  ],

  Admin: [
    allPermissions.Admin,
    allPermissions.Games.GetAll,
    allPermissions.Moderation.ApproveGames,
    allPermissions.Users.ManageRoles,
    allPermissions.Analytics.ViewPlatformStats,
    // Limited system-wide access
  ],

  Staff: [
    allPermissions.Games.GetAll,
    allPermissions.Moderation.ReviewGames,
    allPermissions.Moderation.ModerateComments,
    allPermissions.Tickets.View,
    allPermissions.Tickets.Respond,
    // Operational permissions
  ],

  Developer: [
    allPermissions.Games.Upload,
    allPermissions.Games.Update,
    allPermissions.Games.GetOwn,
    allPermissions.Games.Monetize,
    allPermissions.Games.Analytics,
    // Game development and management permissions
  ],

  User: [
    allPermissions.Gaming.Play,
    allPermissions.Gaming.SaveProgress,
    allPermissions.Gaming.Leaderboard,
    allPermissions.Gaming.UserProfile,
    // Basic gaming permissions
  ],
};