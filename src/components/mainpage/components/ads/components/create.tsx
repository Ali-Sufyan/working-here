/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateAdPlacementMutation } from "@/app/services/ads/query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Loading from "@/components/utilities/styles/loading";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, PlusCircle, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";


const adPlacementSchema = z.object({
  adName: z.string().min(1, "Ad name is required"),
  adType: z.enum(["banner", "video", "interstitial", "rewarded", "native"]),
  placementLocation:z.enum(['mainMenu','gamePlay', 'gameEnd', 'loadingScreen']),
  platform: z.enum(["mobile", "desktop", "console", "web"]),
  adContent: z.object({
    url: z.union([z.string(), z.instanceof(File)]),
    clickUrl: z.string().url("Invalid URL"),
    ctaText: z.string(). min(1),
  }),
  dimensions: z.object({
    width: z.number().min(1),
    height: z.number().min(1),
  }),
  targetAudience: z.object({
    ageRange: z.tuple([z.number(), z.number()]),
    regions: z.array(z.string()),
    deviceTypes: z.array(z.string()). default([]),
  }),
  schedule: z.object({
    startDate: z.date().min(new Date()),
    endDate: z.date()
  }),
  priority: z.number().min(1).max(10),
  revenueModel: z.enum(["CPC", "CPM", "CPA", "FlatRate"]),
  estimatedRevenue: z.number().min(0),

},

);

type FormValues = z.infer<typeof adPlacementSchema>;

const CreateAdPlacement = () => {
   const [previewUrl, setPreviewUrl] = useState<string>("");
   const [newRegion, setNewRegion] = useState("");
   const [newDeviceType, setNewDeviceType] = useState("");
   const [waiting, setWaiting] = useState(false);
  const [createAds, {
  isLoading,isSuccess,error, isError  
  }] = useCreateAdPlacementMutation()
  const navigation = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      successToast("Ad Placement created successfully", {
    duration: 5000,
  })
    }
    if (isError) {
      errorToast(typeof error==='string'?error: typeof error === 'object'?error?.message:
        "Failed to create Ad Placement")
    }
},[error, isError, isSuccess])
  const saveTimeoutRef = useRef<any>(null);
   const form = useForm<FormValues>({
     resolver: zodResolver(adPlacementSchema),
     defaultValues: {
       adType: "banner",
       platform: "web",
       dimensions: { width: 300, height: 250 },
       targetAudience: {
         ageRange: [13, 65],
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
       revenueModel: "CPM",
     
       estimatedRevenue: 0,
    
     },mode:"all"
   });

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       const url = URL.createObjectURL(file);
       setPreviewUrl(url);
       form.setValue("adContent.url", file);
     }
   };

   const addRegion = () => {
     if (newRegion) {
       const currentRegions = form.getValues("targetAudience.regions");
       form.setValue("targetAudience.regions", [...currentRegions, newRegion]);
       setNewRegion("");
     }
   };

   const removeRegion = (region: string) => {
     const currentRegions = form.getValues("targetAudience.regions");
     form.setValue(
       "targetAudience.regions",
       currentRegions.filter((r) => r !== region)
     );
   };

   const addDeviceType = () => {
     if (newDeviceType) {
       const currentDeviceTypes = form.getValues("targetAudience.deviceTypes");
       form.setValue("targetAudience.deviceTypes", [
         ...currentDeviceTypes,
         newDeviceType,
       ]);
       setNewDeviceType("");
     }
   };

   const removeDeviceType = (deviceType: string) => {
     const currentDeviceTypes = form.getValues("targetAudience.deviceTypes");
     form.setValue(
       "targetAudience.deviceTypes",
       currentDeviceTypes.filter((d) => d !== deviceType)
     );
   };

  async function onSubmit (
    data: FormValues
  ) {
 

    if (isLoading) {
      return
    }
    if (waiting === true) return
   console.log({data})
setWaiting(true)
   if (saveTimeoutRef.current) {
     clearTimeout(saveTimeoutRef.current);
   }
     saveTimeoutRef.current = setTimeout(async () => {
      try {
        setWaiting(false);
        const formData = new FormData();
        formData.append("adName", data.adName);
        formData.append("adType", data.adType);
        formData.append("platform", data.platform);
        formData.append("url", data.adContent.url);
        formData.append("adContent", JSON.stringify(data.adContent));
        formData.append("dimensions", JSON.stringify(data.dimensions));
        formData.append("targetAudience", JSON.stringify(data.targetAudience));
        formData.append("schedule", JSON.stringify(data.schedule));
        formData.append("priority", data.priority.toString());
        formData.append("revenueModel", data.revenueModel);
        formData.append("estimatedRevenue", data.estimatedRevenue.toString());
        formData.append("placementLocation", data.placementLocation);


        await createAds(formData);
      } catch (error) {
        console.error("Error saving the ads:", error);
      } finally {
        // Cleanup state after the save process.
        setWaiting(false);
      }
     }, 2000);
     
     
   }

  function handleCancel () {
    if (isLoading) {
      return
    }
     if (saveTimeoutRef.current && waiting ===true) {
       clearTimeout(saveTimeoutRef.current);
       saveTimeoutRef.current = null;
       setWaiting(false);
     }else{
      navigation('-1')
     }
   }
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create Ad Placement
            </CardTitle>
            <CardDescription>
              Configure a new ad placement with targeting and content settings
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="adName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter ad name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="adType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ad Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="banner">Banner</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="interstitial">
                                  Interstitial
                                </SelectItem>
                                <SelectItem value="rewarded">
                                  Rewarded
                                </SelectItem>
                                <SelectItem value="native">Native</SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="mobile">Mobile</SelectItem>
                                <SelectItem value="desktop">Desktop</SelectItem>
                                <SelectItem value="console">Console</SelectItem>
                                <SelectItem value="web">Web</SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="placementLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Placement Location
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mainMenu">Main Menu</SelectItem>
                            <SelectItem value="gamePlay">Game Play</SelectItem>
                            <SelectItem value="gameEnd">Game End</SelectItem>
                            <SelectItem value="loadingScreen">Loading Screen</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Ad Content */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Ad Content</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <FormLabel>Ad Media</FormLabel>
                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            accept={
                              form.watch("adType") === "video"
                                ? "video/*"
                                : "image/*"
                            }
                            onChange={handleFileChange}
                            className="flex-1"
                          />
                          {previewUrl && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <Eye className="w-4 h-4 mr-2" />
                                  Preview
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Ad Preview</DialogTitle>
                                </DialogHeader>
                                {form.watch("adType") === "video" ? (
                                  <video
                                    src={previewUrl}
                                    controls
                                    className="w-full"
                                  />
                                ) : (
                                  <img
                                    src={previewUrl}
                                    alt="Ad preview"
                                    className="w-full"
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="adContent.clickUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Click URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter destination URL"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="adContent.ctaText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CTA Text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter call-to-action text"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Targeting */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Targeting</h3>

                    <FormField
                      control={form.control}
                      name="targetAudience.ageRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age Range</FormLabel>
                          <div className="pt-2">
                            <FormControl>
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                value={field.value}
                                onValueChange={field.onChange}
                                className=""
                              />
                            </FormControl>
                            <div className="flex justify-between text-gray-900 mt-2">
                              <span>{field.value[0]} years</span>
                              <span>{field.value[1]} years</span>
                            </div>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Regions */}
                    <div className="space-y-2">
                      <FormLabel>Regions</FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a region"
                          value={newRegion}
                          onChange={(e) => setNewRegion(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addRegion}
                          variant="outline"
                        >
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch("targetAudience.regions").map((region) => (
                          <Badge
                            key={region}
                            variant="secondary"
                            className="flex items-center gap-2"
                          >
                            {region}
                            <X
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => removeRegion(region)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Device Types */}
                    <div className="space-y-2">
                      <FormLabel>Device Types</FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a device type"
                          value={newDeviceType}
                          onChange={(e) => setNewDeviceType(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addDeviceType}
                          variant="outline"
                        >
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form
                          .watch("targetAudience.deviceTypes")
                          .map((deviceType) => (
                            <Badge
                              key={deviceType}
                              variant="secondary"
                              className="flex items-center gap-2"
                            >
                              {deviceType}
                              <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => removeDeviceType(deviceType)}
                              />
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Schedule and Revenue */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="schedule.startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={field.value.toISOString().split("T")[0]}
                              onChange={(e) =>
                                field.onChange(new Date(e.target.value))
                              }
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="schedule.endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={field.value.toISOString().split("T")[0]}
                              onChange={(e) =>
                                field.onChange(new Date(e.target.value))
                              }
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Revenue Model and Estimated Revenue */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="revenueModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Revenue Model</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="CPC">
                                CPC (Cost Per Click)
                              </SelectItem>
                              <SelectItem value="CPM">
                                CPM (Cost Per Mille)
                              </SelectItem>
                              <SelectItem value="CPA">
                                CPA (Cost Per Action)
                              </SelectItem>
                              <SelectItem value="FlatRate">
                                Flat Rate
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estimatedRevenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Revenue</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                $
                              </span>
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="pl-8"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Dimensions */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Ad Dimensions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dimensions.width"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Width (px)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Width"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dimensions.height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (px)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Height"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Priority and Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority Level (1-10)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Higher number means higher priority
                          </FormDescription>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </CardContent>

              <CardFooter className="flex justify-end space-x-4 bg-slate-50">
                <Button
                  type="button"
                  variant="outline"
                  className="flex flex-row align-middle items-center gap-1"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   // Add your submit logic here
                  //   onSubmit()
                  // }}
                >
                  {(isLoading|| waiting) && (
                    <Loading
                      transparent={true}
                      size={20}
                      fullscreen={false}
                      color="white"
                    />
                  )}{" "}
                  Create Ad Placement
                </Button>
              </CardFooter>
              {Object.keys(form.formState.errors).length > 0 && (
                <div className="p-4 text-red-500">
                  <p>Please fix the following errors:</p>
                  <ul className="list-disc pl-4">
                    {Object.entries(form.formState.errors).map(
                      ([key, error]: [string, any]) => (
                        <li key={key}>{error.message}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </form>
          </Form>
        </Card>
      </div>
    );
}

export default CreateAdPlacement;