/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGameAsset } from "@/app/services/games/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Box } from "@mui/material";
import { useCreateGameMutation } from "@/app/services/games/query";
import { ICreateGame } from "@/app/slices/games/games.interface";
import { useAppSelector } from "@/app/slices/hooks";
import { CheckboxGroup } from "@/components/ui/checkbox";
import { Dropdown } from "@/components/ui/dropdown";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/utilities/styles/loading";
import { errorToast, successToast } from "@/components/utilities/toaster";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Gamepad2Icon,
  Image,
  InfoIcon,
  MessageCircleDashedIcon,
  Monitor,
  PlusCircle,
  Save,
  Trash2,
} from "lucide-react";
import { Key, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface DbSystemRequirement {
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

interface SystemRequirement {
  id: string;
  platform: string;
  minOS: string;
  minCPU: string;
  minRAM: string;
  minStorage: string;
  recommendedOS: string;
  recommendedCPU: string;
  recommendedRAM: string;
  recommendedStorage: string;
  expanded?: boolean;
}

const GamesManagementUI = () => {
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();

  const saveTimeoutRef = useRef<any>(null);
  const [
    createGame,
    { isLoading: isLox, isSuccess: isSux, isError, error, data: xData },
  ] = useCreateGameMutation();

  const uploadProgress = useAppSelector(
    (state) => state.gameUpload.uploadProgress
  );
  function handleUploadProgress() {
    if (isLox) {
      if (uploadProgress > 80) {
        return 80;
      }
      return uploadProgress;
    } else {
      if (uploadProgress === 100) {
        return 0;
      } else {
        return uploadProgress;
      }
    }
  }
  useEffect(() => {
    if (isSux) {
      successToast("Game created successfully");
      navigate("/games");
    }

    if (isError) {
      if (typeof error === "string") {
        errorToast(error || "An error occurred while saving your game");
      } else {
        errorToast(error?.data?.message);
      }
    }
  }, [error, isError, isSux, xData]);

  const platformOptions = [
    "Windows",
    "macOS",
    "Linux",
    "Web Browser",
    "mobile",
  ];

  const [gameFiles, setGameFiles] = useState<File[]>([]);
  const [currentAssetType, setCurrentAssetType] = useState<
    IGameAsset["type"] | ""
  >("");
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [gameAssets, setGameAssets] = useState<
    (IGameAsset & { file?: File })[]
  >([]);
  const [systemRequirements, setSystemRequirements] = useState<
    SystemRequirement[]
  >([
    {
      id: "1",
      platform: "Windows",
      minOS: "",
      minCPU: "",
      minRAM: "",
      minStorage: "",
      recommendedOS: "",
      recommendedCPU: "",
      recommendedRAM: "",
      recommendedStorage: "",
      expanded: true,
    },
  ]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "Windows",
  ]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  function handleGenreChange(genre: string[]) {
    setGameData((prev: any) => ({ ...prev, genres: genre }));

    setHasUnsavedChanges(true);
  }

  const addSystemRequirement = () => {
    const availablePlatforms = platformOptions.filter(
      (platform) => !selectedPlatforms.includes(platform)
    );
    // check if there are availabel form and if the last added data is completely added

    const lastReq = systemRequirements[0];

    const lastReqFields = Object.values(lastReq).slice(1, -1);
    const isLastReqFilled = lastReqFields.every((field) => field.trim() !== "");
    if (!isLastReqFilled) {
      toast.error(
        "Please fill all required fields before adding a new platform"
      );
      return;
    }

    if (availablePlatforms.length > 0) {
      const newReq: SystemRequirement = {
        id: Date.now().toString(),
        platform: "",
        minOS: "",
        minCPU: "",
        minRAM: "",
        minStorage: "",
        recommendedOS: "",
        recommendedCPU: "",
        recommendedRAM: "",
        recommendedStorage: "",
        expanded: true,
      };
      setSystemRequirements((prev) => [newReq, ...prev]);
    }
  };

  const removeSystemRequirement = (id: string) => {
    const removedReq = systemRequirements.find((req) => req.id === id);

    setSystemRequirements((prev) => prev.filter((req) => req.id !== id));

    if (removedReq && removedReq.platform) {
      setSelectedPlatforms((prev) =>
        prev.filter((p) => p !== removedReq.platform)
      );
    }
  };

  const updateSystemRequirement = (
    id: string,
    field: keyof SystemRequirement,
    value: string
  ) => {
    setSystemRequirements((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          // If updating platform, manage selected platforms
          if (field === "platform") {
            // Remove old platform from selected if exists

            // const newPf = [... new Set([...selectedPlatforms, value])];

            // setSelectedPlatforms(newPf);
            const oldPlatform = req.platform;
            const updatedSelectedPlatforms = oldPlatform
              ? selectedPlatforms.filter((p) => p !== oldPlatform)
              : selectedPlatforms;

            // Add new platform to selected if not empty
            const newSelectedPlatforms = value
              ? [...updatedSelectedPlatforms, value]
              : updatedSelectedPlatforms;

            setSelectedPlatforms(newSelectedPlatforms);
          }

          return { ...req, [field]: value };
        }
        return req;
      })
    );
  };

  const toggleExpand = (id: string) => {
    setSystemRequirements((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, expanded: !req.expanded } : req
      )
    );
  };

  // Filter available platforms for dropdown
  const getAvailablePlatforms = (currentReqId: string) => {
    const currentReq = systemRequirements.find(
      (req) => req.id === currentReqId
    );
    const currentPlatform = currentReq?.platform;

    return platformOptions.filter(
      (platform) =>
        !selectedPlatforms.includes(platform) || platform === currentPlatform
    );
  };

  const [gameData, setGameData] = useState<ICreateGame>({
    title: "",
    description: "",
    genres: [],
    features: [],
    socialLinks: {
      discord: "",
      twitter: "",
      facebook: "",
      youtube: "",
      twitch: "",
    },
    ageRating: "",
    contentWarnings: [],
    systemRequirements: [],

    versions: {
      version: "1.0.0",
      releaseNotes: "",
      publishedAt: String(new Date()),
      size: 0,
      downloadUrl: "",
      changelog: [],
      isPublic: false,
    },
    assets: [],
  });

  const _genreOptions = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Puzzle",
    "Racing",
  ];
  const _featureOptions = [
    "Singleplayer",
    "Multiplayer",
    "Co-op",
    "Controller Support",
    "VR Support",
    "Online PvP",
    "Local PvP",
    "Cross-platform",
  ];

  const handleSubmit = () => {
    try {
      // Validation schema
      const requiredFields = {
        title: "Title is required",
        description: "Description is required",
        genres: "At least one genre is required",
        features: "At least one feature is required",
        ageRating: "Age rating is required",
        contentWarnings: "Content warnings are required",

        versions: "At least one version is required",
        assets: "At least one asset is required",
      };

      // Validation errors array
      const errors: any[] = [];

      // Check required fields
      Object.entries(requiredFields).forEach(([field, message]) => {
        if (
          field === "genres" ||
          field === "features" ||
          field === "contentWarnings"
        ) {
          // Array fields should have at least one item
          if (
            !gameData[field] ||
            !Array.isArray(gameData[field]) ||
            gameData[field].length === 0
          ) {
            errors.push(message);
          }
        } else if (field === "versions") {
          // Object validation
          if (!gameData[field] || Object.keys(gameData[field]).length === 0) {
            errors.push(message);
          }
        } else if (gameAssets.length === 0) {
          errors.push(requiredFields.assets);
        } else {
          // String fields should not be empty
          if (
            !gameData[field as unknown as keyof ICreateGame] ||
            gameData[field as unknown as keyof ICreateGame] === ""
          ) {
            errors.push(message);
          }
        }
      });

      // Validate socialLinks format if provided
      if (
        gameData.socialLinks &&
        Object.keys(gameData.socialLinks).length > 0
      ) {
        Object.entries(gameData.socialLinks).forEach(([platform, url]) => {
          if (url && !isValidUrl(url as string)) {
            errors.push(`Invalid URL for ${platform}`);
          }
        });
      }

      // If there are validation errors, throw them
      if (errors.length > 0) {
        errorToast(`Validation failed: ${errors.join("\n ")}`, {
          duration: 10000,
        });

        throw new Error(errors.join("\n"));
      }
      const sysReq = convertSystemRequirements(systemRequirements);
      if (sysReq.length === 0) {
        errorToast("Please add system requirements");
        throw new Error("Please add system requirements");
      }

      if (gameFiles.length === 0) {
        errorToast("Please upload the game file", { duration: 10000 });
        throw new Error("Please upload at least one asset file");
      }
      gameData.systemRequirements = sysReq;

      // Create FormData object
      const formData = new FormData();

      // Append required fields
      formData.append("title", gameData.title.trim());
      formData.append("description", gameData.description.trim());
      formData.append("genres", JSON.stringify(gameData.genres));
      formData.append("features", JSON.stringify(gameData.features));
      formData.append("ageRating", gameData.ageRating);
      formData.append("isDraft", isDraft.toString());
      formData.append(
        "contentWarnings",
        JSON.stringify(gameData.contentWarnings)
      );

      const getSysReq = gameData.systemRequirements.filter((data) => {
        return data.platform !== "";
      });
      formData.append("systemRequirements", JSON.stringify(getSysReq));
      formData.append("versions", JSON.stringify(gameData.versions));
      // formData.append("assets", JSON.stringify(gameData.assets));

      // Append socialLinks only if they exist
      if (
        gameData.socialLinks &&
        Object.keys(gameData.socialLinks).length > 0
      ) {
        formData.append("socialLinks", JSON.stringify(gameData.socialLinks));
      }

      // settle asset types
      if (gameAssets.length > 0) {
        gameAssets.forEach((asset) => {
          formData.append(asset.type, asset.file as Blob);
        });
      }

      //add game file to form data
      formData.append("gameFile", gameFiles[0]);
      formData.append("size", gameFiles[0].size.toString());
      // Return the validated formData
      return formData;
    } catch (error: any) {
      // Handle validation errors
      console.error("Validation failed:", error?.message);
      throw error;
    }
  };

  // Helper function to validate URLs
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  async function handleSave() {
    setWaiting(true);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    // // Add save logic here
    // const formData = handleSubmit();

    // await(createGame(formData));

    // setHasUnsavedChanges(false);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        setWaiting(false);

        const formData = handleSubmit();

        await createGame(formData);

        setHasUnsavedChanges(false);
      } catch (error) {
        console.error("Error saving the game:", error);
      } finally {
        setWaiting(false);
      }
    }, 3000);
  }

  const cancelSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
      setWaiting(false);
    }
  };

  const updateNestedField = (
    section: keyof ICreateGame,
    field: string,
    value: any,
    index?: number
  ) => {
    setGameData((prev) => {
      if (field === "") {
        return {
          ...prev,
          [section]: value,
        };
      }

      const updatedSection = Array.isArray(prev[section])
        ? [...(prev[section] as any[])]
        : { ...(prev[section] as any) };

      if (index !== undefined) {
        updatedSection[index] = {
          ...(updatedSection[index] || {}),
          ...(typeof value === "object" ? value : { [field]: value }),
        };
      } else {
        updatedSection[field] = value;
      }

      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const [isDraft, setIsDraft] = useState(true);

  const onFilesChange = (files: File[]) => {
    if (!currentAssetType) {
      errorToast("Please select an asset type first");
      setCurrentFiles([]);
      return;
    }

    console.log(onFilesChange, "onFilesChange");

    if (gameAssets.some((asset) => asset.type === currentAssetType)) {
      errorToast(`A ${currentAssetType} asset already exists`);
      setCurrentFiles([]);
      return;
    }

    const newAssets = files.map((file: File) => ({
      type: currentAssetType as IGameAsset["type"],
      url: URL.createObjectURL(file),
      file,
    }));

    setGameAssets((prev) => [...prev, ...newAssets]);
    setHasUnsavedChanges(true);
    setCurrentFiles([]);

    if (["banner", "logo", "cover"].includes(currentAssetType)) {
      setCurrentAssetType("");
    }
  };

  function convertSystemRequirements(
    systemRequirements: SystemRequirement[]
  ): DbSystemRequirement[] {
    const newSys = systemRequirements.map((req) => {
      const { id, expanded, ...rest } = req;
      return rest;
    });
    const dbSystemRequirements: DbSystemRequirement[] = newSys.map((req) => {
      return {
        platform: req.platform,
        minimum: {
          os: req.minOS,
          processor: req.minCPU,
          memory: req.minRAM,
          storage: req.minStorage,
          graphics: "",
        },
        recommended: {
          os: req.recommendedOS,
          processor: req.recommendedCPU,
          memory: req.recommendedRAM,
          storage: req.recommendedStorage,
          graphics: "",
        },
      };
    });
    return dbSystemRequirements;
  }

  const renderSystemRequirementsSection = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Monitor className="w-5 h-5" />
            System Requirements
          </h2>
          <Button
            onClick={addSystemRequirement}
            variant="outline"
            className="flex items-center gap-2"
            disabled={selectedPlatforms.length >= platformOptions.length}
          >
            <PlusCircle className="w-4 h-4" />
            Add Platform
          </Button>
        </div>

        <div className="space-y-8">
          {systemRequirements.map((req) => (
            <div
              key={req.id}
              className="relative p-6 border rounded-lg bg-gray-50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex-grow mr-4">
                  <Label className="text-gray-700">Platform</Label>
                  <Select
                    value={req.platform}
                    onValueChange={(value) =>
                      updateSystemRequirement(req.id, "platform", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailablePlatforms(req.id).map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {req.platform && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(req.id)}
                    className="mr-2"
                  >
                    {req.expanded ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                )}

                {systemRequirements.length > 1 && req.platform && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSystemRequirement(req.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {req.platform && req.expanded && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Minimum Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Minimum Requirements
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-700">
                          Operating System
                        </Label>
                        <Input
                          value={req.minOS}
                          onChange={(e) =>
                            updateSystemRequirement(
                              req.id,
                              "minOS",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Windows 10 64-bit"
                          className={
                            req.platform && !req.minOS ? "border-red-500" : ""
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700">Processor (CPU)</Label>
                        <Input
                          value={req.minCPU}
                          onChange={(e) =>
                            updateSystemRequirement(
                              req.id,
                              "minCPU",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Intel Core i5-4460"
                          className={
                            req.platform && !req.minCPU ? "border-red-500" : ""
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700">Memory (RAM)</Label>
                        <Input
                          value={req.minRAM}
                          onChange={(e) =>
                            updateSystemRequirement(
                              req.id,
                              "minRAM",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 8 GB RAM"
                          className={
                            req.platform && !req.minRAM ? "border-red-500" : ""
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700">Storage</Label>
                        <Input
                          value={req.minStorage}
                          onChange={(e) =>
                            updateSystemRequirement(
                              req.id,
                              "minStorage",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 20 GB available space"
                          className={
                            req.platform && !req.minStorage
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recommended Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Recommended Requirements
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-700">
                          Operating System
                        </Label>
                        <Input
                          value={req.recommendedOS}
                          onChange={(e) =>
                            updateSystemRequirement(
                              req.id,
                              "recommendedOS",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Windows 11 64-bit"
                          className={
                            req.platform && !req.recommendedOS
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700">Processor (CPU)</Label>
                        <Input
                          value={req.recommendedCPU}
                          onChange={(e) =>
                            updateSystemRequirement(
                              req.id,
                              "recommendedCPU",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Intel Core i7-8700"
                          className={
                            req.platform && !req.recommendedCPU
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700">Memory (RAM)</Label>
                        <Input
                          value={req.recommendedRAM}
                          onChange={(e) =>
                            updateSystemRequirement(
                              req.id,
                              "recommendedRAM",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 16 GB RAM"
                          className={
                            req.platform && !req.recommendedRAM
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700">Storage</Label>
                        <Input
                          value={req.recommendedStorage}
                          onChange={(e) =>
                            updateSystemRequirement(
                              req.id,
                              "recommendedStorage",
                              e.target.value
                            )
                          }
                          placeholder="e.g., 50 GB available space"
                          className={
                            req.platform && !req.recommendedStorage
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <div className="min-h-screen mx-auto bg-gray-50">
          <Card className="w-full shadow-lg">
            <CardHeader className="border-b">
              <div className="flex flex-col gap-4 pt-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900">
                    Games Management
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-600">
                    Configure and manage your game's settings, assets, and
                    distribution
                  </CardDescription>
                </div>
                <div className="flex flex-row gap-4 p-3 align-bottom rounded-lg place-items-baseline bg-gray-50">
                  <TooltipProvider>
                    <Tooltip>
                      {" "}
                      <>
                        <Switch
                          checked={isDraft}
                          onCheckedChange={(checked) => {
                            setIsDraft(checked);
                            setHasUnsavedChanges(true);
                          }}
                        />
                        <Label className="font-medium text-center">
                          <TooltipTrigger style={{ background: "transparent" }}>
                            Draft Mode
                          </TooltipTrigger>
                        </Label>
                      </>
                      <TooltipContent
                        style={{
                          color: "black",
                          zIndex: 9999,
                          background: "hsl(249,40%,97%)",
                          padding: "0.5rem",
                        }}
                      >
                        <p className="text-sm text-gray-500">
                          Draft mode allows you to save your changes without
                          publishing them.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {hasUnsavedChanges && (
                    <div className="flex items-center text-amber-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Unsaved changes</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="Game-upload" className="space-y-6">
                <TabsList className="w-full flex justify-center text-white flex-wrap gap-4 !h-auto bg-gray-50">
                  <TabsTrigger
                    value="Game-upload"
                    className="flex-1 py-3 border border-gray-400"
                  >
                    <InfoIcon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">
                      General Information
                    </span>
                    <span className="sm:hidden">General</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="Game-settings"
                    className="flex-1 py-3 mx-1 border-gray-400"
                  >
                    <Gamepad2Icon className="w-4 h-4 mr-2" />

                    <span className="hidden sm:inline">Versioning</span>
                    <span className="sm:hidden">Versions</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="Game-media"
                    className="flex-1 py-3 border-gray-400"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Media Assets</span>
                    <span className="sm:hidden">Media</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="social"
                    className="flex-1 py-3 mx-1 border-gray-400"
                  >
                    <MessageCircleDashedIcon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Social & Community</span>
                    <span className="sm:hidden">Social</span>
                  </TabsTrigger>
                </TabsList>
                <div className="py-2"></div>
                <TabsContent value="Game-upload" className="space-y-8">
                  <section className="space-y-6">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h2 className="mb-4 text-xl font-bold text-gray-900">
                        Basic Information
                      </h2>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="Game-Title" className="text-gray-700">
                            Game Title
                          </Label>
                          <Input
                            id="Game-Title"
                            value={gameData.title}
                            onChange={(e) => {
                              updateNestedField("title", "", e.target.value);
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full"
                            placeholder="Enter game title"
                          />
                        </div>

                        <div className="space-y-2 ">
                          <Label
                            htmlFor="Game-Description"
                            className="text-gray-700"
                          >
                            Game Description
                          </Label>
                          <Input
                            id="Game-Description"
                            value={gameData.description}
                            required={true}
                            onChange={(e) => {
                              updateNestedField(
                                "description",
                                "",
                                e.target.value
                              );
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full"
                            placeholder="Enter game description"
                          />
                        </div>
                        <div className="space-y-2 ">
                          <Label htmlFor="Genres" className="text-gray-700">
                            Genres
                          </Label>
                          <CheckboxGroup
                            options={_genreOptions}
                            value={gameData.genres}
                            onChange={handleGenreChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="Features" className="text-gray-700">
                            Features
                          </Label>
                          <CheckboxGroup
                            options={_featureOptions}
                            value={gameData.features}
                            onChange={(features) => {
                              updateNestedField("features", "", features);
                              setHasUnsavedChanges(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {renderSystemRequirementsSection()}
                  </section>
                </TabsContent>
                <TabsContent value="Game-settings" className="space-y-8">
                  <section className="px-6 bg-white rounded-lg shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                      Release Configuration
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="Current-Version"
                          className="text-gray-700"
                        >
                          Version
                        </Label>
                        <Input
                          id="Current-Version"
                          value={gameData.versions.version}
                          onChange={(e) => {
                            setGameData((prev) => ({
                              ...prev,
                              versions: {
                                ...prev.versions,
                                version: e.target.value,
                              },
                            }));

                            setHasUnsavedChanges(true);
                          }}
                          placeholder="e.g., 1.0.0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="Release-Notes"
                          className="text-gray-700"
                        >
                          Release Notes
                        </Label>
                        <Input
                          id="Release-Notes"
                          value={gameData.versions.releaseNotes}
                          onChange={(e) => {
                            updateNestedField(
                              "versions",
                              "releaseNotes",
                              e.target.value
                            );
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Summarize changes in this version"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700">
                          Version Visibility
                        </Label>
                        <div className="flex items-center space-x-4">
                          <Switch
                            checked={gameData.versions.isPublic}
                            onCheckedChange={(isPublic) => {
                              updateNestedField(
                                "versions",
                                "isPublic",
                                isPublic
                              );
                              setHasUnsavedChanges(true);
                            }}
                          />
                          <Label>Make this version publicly available</Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Changelog" className="text-gray-700">
                          Changelog
                        </Label>
                        <div className="space-y-2">
                          {gameData.versions.changelog.map(
                            (
                              change:
                                | string
                                | number
                                | readonly string[]
                                | undefined,
                              index: Key | null | undefined
                            ) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={change}
                                  onChange={(e) => {
                                    const newChangelog = [
                                      ...gameData.versions.changelog,
                                    ];
                                    newChangelog[index as any] = e.target.value;
                                    updateNestedField(
                                      "versions",
                                      "changelog",
                                      newChangelog
                                    );
                                    setHasUnsavedChanges(true);
                                  }}
                                  placeholder={`Change ${(index as any) + 1}`}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  className="p-2 text-red-500 hover:text-red-700"
                                  onClick={() => {
                                    const newChangelog =
                                      gameData.versions.changelog.filter(
                                        (_: any, i: any) => i !== index
                                      );
                                    updateNestedField(
                                      "versions",
                                      "changelog",
                                      newChangelog
                                    );
                                    setHasUnsavedChanges(true);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                  </svg>
                                </Button>
                              </div>
                            )
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              // Check if there are any empty changelog entries
                              const hasEmptyChangelog =
                                gameData.versions.changelog.some(
                                  (change: string) => !change.trim()
                                );

                              // Only add new entry if there are no empty entries
                              if (!hasEmptyChangelog) {
                                const newChangelog = [
                                  ...gameData.versions.changelog,
                                  "",
                                ];
                                updateNestedField(
                                  "versions",
                                  "changelog",
                                  newChangelog
                                );
                                setHasUnsavedChanges(true);
                              }
                            }}
                            disabled={gameData.versions.changelog.some(
                              (change: string) => !change.trim()
                            )}
                            className="w-full"
                          >
                            {gameData.versions.changelog.some(
                              (change: string) => !change.trim()
                            )
                              ? "Please fill in empty changelog entry"
                              : "Add Changelog Entry"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                      Distribution Settings
                    </h2>
                    <div className="p-6 bg-white rounded-lg shadow-sm">
                      <h2 className="mb-4 text-xl font-bold text-gray-900">
                        Game Files
                      </h2>
                      <FileUpload
                        label="Upload Game Files"
                        files={gameFiles}
                        accept=".zip,.rar,.7z"
                        maxSize={100 * 1024 * 1024}
                        onFilesChange={(files) => {
                          if (files.length > 1) {
                            toast.error("Only one file is allowed");
                            return;
                          }
                          setGameFiles(files);
                          setHasUnsavedChanges(true);
                        }}
                      />
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="Game-media" className="space-y-8">
                  <section className="px-6 bg-white rounded-lg shadow-sm">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                      Media Assets
                    </h2>
                    <div className="mb-6">
                      <Dropdown
                        label="Asset Type"
                        value={currentAssetType}
                        onChange={(value) => setCurrentAssetType(value as any)}
                        options={
                          // Filter out asset types that are already in use
                          (
                            [
                              "screenshot",
                              "video",
                              "banner",
                              "logo",
                              "cover",
                            ] as const
                          ).filter(
                            (type) =>
                              !gameAssets.some((asset) => asset.type === type)
                          )
                        }
                      />
                    </div>

                    <FileUpload
                      label={`Upload ${
                        currentAssetType
                          ? currentAssetType.charAt(0).toUpperCase() +
                            currentAssetType.slice(1)
                          : "Media"
                      }`}
                      files={currentFiles}
                      accept="image/*,video/*"
                      onFilesChange={(files) => {
                        // When files are added, create asset objects
                        const newAssets = files.map((file) => ({
                          type: currentAssetType as IGameAsset["type"],
                          url: URL.createObjectURL(file), // Temporary URL for preview
                          file: file, // Keep the original file for upload
                        }));

                        // Update game assets
                        setGameAssets((prev) => [...prev, ...newAssets]);
                        // setCurrentFiles(files);
                        setCurrentFiles([]);
                        setHasUnsavedChanges(true);
                      }}
                    />

                    {/* Asset Preview/Management Section */}
                    {gameAssets.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-4 text-lg font-semibold">
                          Current Assets
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {gameAssets.map((asset, index) => {
                            const file = asset.file;
                            const fileType = file?.type || "";
                            const isImage = fileType.startsWith("image/");
                            const isVideo = fileType.startsWith("video/");
                            //const isOther = !isImage && !isVideo;

                            return (
                              <div
                                key={index}
                                className="relative p-2 transition border rounded-lg bg-gray-50 hover:shadow-md"
                              >
                                {/* Dynamic Preview */}
                                {isImage ? (
                                  <img
                                    src={asset.url}
                                    alt={`${asset.type} preview`}
                                    className="object-cover w-full h-40 rounded"
                                  />
                                ) : isVideo ? (
                                  <video
                                    src={asset.url}
                                    controls
                                    className="object-cover w-full h-40 rounded"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center w-full h-40 text-gray-700 bg-gray-100 rounded">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-10 h-10 mb-2 text-gray-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                      />
                                    </svg>
                                    <span className="text-sm font-medium text-center break-words">
                                      {file?.name || `${asset.type} Asset`}
                                    </span>
                                  </div>
                                )}

                                {/* Remove button */}
                                <button
                                  onClick={() => {
                                    setGameAssets((prev) =>
                                      prev.filter((_, i) => i !== index)
                                    );
                                    setHasUnsavedChanges(true);
                                  }}
                                  className="absolute p-1 text-xs text-white transition bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                                >
                                  ✕
                                </button>

                                {/* Label */}
                                <p className="mt-2 text-xs font-semibold text-center text-gray-600 capitalize">
                                  {asset.type}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </section>
                </TabsContent>

                <TabsContent value="social" className="space-y-8">
                  <section className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                      Social Media Links
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="Discord" className="text-gray-700">
                          Discord
                        </Label>
                        <Input
                          id="Discord"
                          value={gameData.socialLinks?.discord || ""}
                          onChange={(e) => {
                            updateNestedField(
                              "socialLinks",
                              "discord",
                              e.target.value
                            );
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Discord server invite link"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="Twitter" className="text-gray-700">
                          Twitter
                        </Label>
                        <Input
                          id="Twitter"
                          value={gameData.socialLinks?.twitter || ""}
                          onChange={(e) => {
                            updateNestedField(
                              "socialLinks",
                              "twitter",
                              e.target.value
                            );
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Twitter profile or game account"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="Facebook" className="text-gray-700">
                          Facebook
                        </Label>
                        <Input
                          id="Facebook"
                          value={gameData.socialLinks?.facebook || ""}
                          onChange={(e) => {
                            updateNestedField(
                              "socialLinks",
                              "facebook",
                              e.target.value
                            );
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Facebook page link"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="YouTube" className="text-gray-700">
                          YouTube
                        </Label>
                        <Input
                          id="YouTube"
                          value={gameData.socialLinks?.youtube || ""}
                          onChange={(e) => {
                            updateNestedField(
                              "socialLinks",
                              "youtube",
                              e.target.value
                            );
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="YouTube channel link"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="Twitch" className="text-gray-700">
                          Twitch
                        </Label>
                        <Input
                          id="Twitch"
                          value={gameData.socialLinks?.twitch || ""}
                          onChange={(e) => {
                            updateNestedField(
                              "socialLinks",
                              "twitch",
                              e.target.value
                            );
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Twitch channel link"
                        />
                      </div>
                    </div>
                  </section>

                  <section className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                      Community Settings
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700">
                          Content Warnings
                        </Label>
                        <CheckboxGroup
                          value={gameData.contentWarnings}
                          onChange={(warnings) => {
                            updateNestedField("contentWarnings", "", warnings);
                            setHasUnsavedChanges(true);
                          }}
                          options={[
                            "Violence",
                            "Sexual Content",
                            "Strong Language",
                            "Gambling",
                            "Drug References",
                            "Mature Themes",
                          ]}
                        />
                      </div>

                      <div className="space-y-2">
                        <Dropdown
                          label="Age Rating"
                          value={gameData.ageRating}
                          onChange={(rating) => {
                            updateNestedField("ageRating", "", rating);
                            setHasUnsavedChanges(true);
                          }}
                          options={[
                            "E (Everyone)",
                            "T (Teen)",
                            "M (Mature)",
                            "AO (Adults Only)",
                          ]}
                        />
                      </div>
                    </div>
                  </section>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-4 mt-8 mb-8">
                <Button
                  disabled={!waiting}
                  variant="outline"
                  onClick={() => {
                    setHasUnsavedChanges(false);
                    cancelSave();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    await handleSave();
                  }}
                  // disabled={!hasUnsavedChanges &&!isLox}
                  className="relative "
                >
                  <div className="flex items-center gap-2">
                    {isLox || waiting ? (
                      <Loading
                        fullscreen={false}
                        lineWeight={6}
                        size={16}
                        transparent={true}
                      />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </div>
                  <Progress
                    value={handleUploadProgress()}
                    className="w-full   absolute bottom-[-1px]"
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Box>
    </div>
  );
};

export default GamesManagementUI;
