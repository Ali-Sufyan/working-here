/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateAdPlacementMutation } from "@/app/services/ads/query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomDatePicker from "@/components/utilities/date-picker";
import Loading from "@/components/utilities/styles/loading";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { mergeCssClass } from "@/components/utilities/utils";
import React, { useEffect, useState } from "react";

interface IAdPlacement {
  _id?: string;
  adName: string;
  adType: "banner" | "video" | "interstitial" | "rewarded" | "native";
  platform: "mobile" | "desktop" | "console" | "web";
  placementLocation: "mainMenu" | "levelEnd" | "loadingScreen";
  dimensions: {
    width: number;
    height: number;
  };
  createdBy: string;
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
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "ACTIVE";
}

interface AdPlacementFormProps {
  initialData?: IAdPlacement;
  onSuccess?: () => void;
}

export const AdPlacementForm: React.FC<AdPlacementFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const [isViewMode, setIsViewMode] = useState(true);

  // Create a deep copy of initialData with JSON parse/stringify
  // or use a default empty object structure
  const [formData, setFormData] = useState<IAdPlacement>(() => {
    if (initialData) {
      return JSON.parse(JSON.stringify(initialData));
    } else {
      return {
        adName: "",
        adType: "banner",
        platform: "web",
        placementLocation: "mainMenu",
        dimensions: { width: 0, height: 0 },
        createdBy: "",
        targetAudience: {
          ageRange: [0, 100],
          regions: [],
          deviceTypes: [],
        },
        adContent: {
          url: "",
          clickUrl: "",
          ctaText: "",
        },
        priority: 1,
        schedule: {
          startDate: new Date(),
          endDate: new Date(),
        },
        revenueModel: "CPC",
        estimatedRevenue: 0,
        impressions: 0,
        clicks: 0,
        conversionRate: 0,
        status: "PENDING",
      };
    }
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [updateAd, { isLoading, isError, isSuccess, error }] = useUpdateAdPlacementMutation();

  useEffect(() => {
    if (formData.adContent.url && typeof formData.adContent.url === "string") {
      setPreviewUrl(formData.adContent.url);
    }
    if (isError) {
      errorToast(
        typeof error === "string"
          ? error
          : typeof error === "object" && error !== null && "message" in error
          ? (error.message as string)
          : "An error occurred when trying to update"
      );
    }
    if (isSuccess) {
      if (onSuccess) onSuccess();
      successToast("Ad Placement Updated Successfully");
    }
  }, [error, formData.adContent.url, isError, isSuccess, onSuccess]);

  const handleInputChange = (path: string, value: any) => {
    setFormData((prev) => {
      // Create a deep copy of the previous state
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let current: any = newData;

      // Navigate to the nested property
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      // Update the value
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formD = new FormData();
    
    // Only include changed values in the form data
    if (initialData) {
      if (formData.adName !== initialData.adName) formD.append("adName", formData.adName);
      if (formData.adType !== initialData.adType) formD.append("adType", formData.adType);
      if (formData.platform !== initialData.platform) formD.append("platform", formData.platform);
      
      // For nested objects, use deep comparison or stringify for comparison
  
      if (JSON.stringify(formData.dimensions) !== JSON.stringify(initialData.dimensions)) {
        console.log('inside dimmension  stringigied')
        formD.append("dimensions", JSON.stringify(formData.dimensions));
      }
      
      if (JSON.stringify(formData.adContent) !== JSON.stringify(initialData.adContent)) {
        // Handle special case for file upload
        if (typeof formData.adContent.url === "object") {
          formD.append("url", formData.adContent.url as any);
          // Add other adContent properties
          formD.append("adContent", JSON.stringify({
            clickUrl: formData.adContent.clickUrl,
            ctaText: formData.adContent.ctaText
          }));
        } else {
          formD.append("adContent", JSON.stringify(formData.adContent));
        }
      }
      
      if (JSON.stringify(formData.schedule) !== JSON.stringify(initialData.schedule)) {
        formD.append("schedule", JSON.stringify({
          startDate: new Date(formData.schedule.startDate),
          endDate: new Date(formData.schedule.endDate)
        }));
      }
      
      if (formData.revenueModel !== initialData.revenueModel) {
        formD.append("revenueModel", formData.revenueModel);
      }
      
      if (formData.estimatedRevenue !== initialData.estimatedRevenue) {
        formD.append("estimatedRevenue", formData.estimatedRevenue.toString());
      }
      
      if (formData.status !== initialData.status) {
        formD.append("status", formData.status);
      }
    } else {
      // If there's no initialData, add all form fields
      formD.append("adName", formData.adName);
      formD.append("adType", formData.adType);
      formD.append("platform", formData.platform);
      formD.append("dimensions", JSON.stringify(formData.dimensions));
      
      if (typeof formData.adContent.url === "object") {
        formD.append("url", formData.adContent.url as any);
        formD.append("adContent", JSON.stringify({
          clickUrl: formData.adContent.clickUrl,
          ctaText: formData.adContent.ctaText
        }));
      } else {
        formD.append("adContent", JSON.stringify(formData.adContent));
      }
      
      formD.append("schedule", JSON.stringify({
        startDate: new Date(formData.schedule.startDate),
        endDate: new Date(formData.schedule.endDate)
      }));
      
      formD.append("revenueModel", formData.revenueModel);
      formD.append("estimatedRevenue", formData.estimatedRevenue.toString());
      formD.append("status", formData.status);
    }

    if (initialData?._id) {
      await updateAd({ data: formD, id: initialData._id });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      handleInputChange("adContent.url", file);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {isViewMode ? "View Ad Placement" : "Edit Ad Placement"}{" "}
          <Button
            className="flex-end"
            variant={"secondary"}
            onClick={() => setIsViewMode((prev) => !prev)}
          >
            {isViewMode ? "Edit Ad" : "View Ad"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="adName">Ad Name</Label>
              <Input
                id="adName"
                value={formData.adName}
                onChange={(e) => handleInputChange("adName", e.target.value)}
                disabled={isViewMode}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ad Type</Label>
                <select
                  value={formData.adType}
                  onChange={(e) => handleInputChange("adType", e.target.value as any)}
                  disabled={isViewMode}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {["banner", "video", "interstitial", "rewarded", "native"].map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Platform</Label>
                <select
                  value={formData.platform}
                  onChange={(e) => handleInputChange("platform", e.target.value as any)}
                  disabled={isViewMode}
                  className="w-full rounded-md border border-gray-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {["mobile", "desktop", "console", "web"].map((platform) => (
                    <option key={platform} value={platform}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ad Content Section */}
            <div className="space-y-4">
              <Label>Ad Content</Label>
              <div className="border rounded-lg p-4 space-y-4">
                <div>
                  <Label>Media Upload</Label>
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    disabled={isViewMode}
                    className="mt-1"
                  />
                </div>

                {previewUrl && (
                  <div className="mt-4">
                    <Label>Preview</Label>
                    <div className="mt-2 border rounded-lg overflow-hidden">
                      {formData.adType === "video" ? (
                        <video
                          src={previewUrl}
                          controls
                          className="w-full max-h-64 object-contain"
                        />
                      ) : (
                        <img
                          src={previewUrl}
                          alt="Ad preview"
                          className="w-full max-h-64 object-contain"
                        />
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Label>Click URL</Label>
                  <Input
                    value={formData.adContent.clickUrl}
                    onChange={(e) => handleInputChange("adContent.clickUrl", e.target.value)}
                    disabled={isViewMode}
                  />
                </div>

                <div>
                  <Label>CTA Text</Label>
                  <Input
                    value={formData.adContent.ctaText}
                    onChange={(e) => handleInputChange("adContent.ctaText", e.target.value)}
                    disabled={isViewMode}
                  />
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Width (px)</Label>
                <Input
                  type="number"
                  value={formData.dimensions.width}
                  onChange={(e) => handleInputChange("dimensions.width", parseInt(e.target.value) || 0)}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <Label>Height (px)</Label>
                <Input
                  type="number"
                  value={formData.dimensions.height}
                  onChange={(e) => handleInputChange("dimensions.height", parseInt(e.target.value) || 0)}
                  disabled={isViewMode}
                />
              </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <CustomDatePicker
                  date={new Date(formData.schedule.startDate)}
                  onChange={(date) => handleInputChange("schedule.startDate", date)}
                  disabled={isViewMode}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <CustomDatePicker
                  date={new Date(formData.schedule.endDate)}
                  onChange={(date) => handleInputChange("schedule.endDate", date)}
                  disabled={isViewMode}
                />
              </div>
            </div>

            {/* Revenue Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Revenue Model</Label>
                <select
                  value={formData.revenueModel}
                  onChange={(e) => handleInputChange("revenueModel", e.target.value as any)}
                  disabled={isViewMode}
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none bg-white focus:ring-2 focus:ring-blue-500"
                >
                  {["CPC", "CPM", "CPA", "FlatRate"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Estimated Revenue</Label>
                <Input
                  type="number"
                  value={formData.estimatedRevenue}
                  onChange={(e) => handleInputChange("estimatedRevenue", parseFloat(e.target.value) || 0)}
                  disabled={isViewMode}
                />
              </div>
            </div>
            {/* created and updated  */}

            <div>
              <Label>Created By</Label>
              <div className="w-full rounded-md border border-gray-300 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {formData.createdBy && typeof formData.createdBy === "object" && (
                  <>
                    <div className="gap-2 flex items-center justify-center">
                      <p>{(formData.createdBy as any)?.firstName}</p>
                      <p>{(formData.createdBy as any)?.lastName}</p>
                    </div>
                    <div>{(formData.createdBy as any)?.email}</div>
                  </>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value as any)}
                disabled={isViewMode}
                className={mergeCssClass(
                  "w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
                  formData.status === "PENDING"
                    ? "text-yellow-600 bg-yellow-200"
                    : formData.status === "APPROVED"
                    ? "text-green-600 bg-green-200"
                    : formData.status === "REJECTED"
                    ? "text-red-600 bg-red-200"
                    : formData.status === "SUSPENDED"
                    ? "text-red-600 bg-red-200"
                    : formData.status === "ACTIVE"
                    ? "text-green-600 bg-green-200"
                    : "text-gray-600 bg-gray-200"
                )}
              >
                {["PENDING", "APPROVED", "REJECTED", "SUSPENDED", "ACTIVE"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!isViewMode && (
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Loading transparent={true} size={20} color={"white"} fullscreen={false} />
              )}{" "}
              Save Ad Placement
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};