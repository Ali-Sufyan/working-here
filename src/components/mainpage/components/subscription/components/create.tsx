import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";

import { useCreateSubscriptionMutation } from "@/app/services/subscription/query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Loading from "@/components/utilities/styles/loading";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const formSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  planType: z.enum(["Monthly", "Annual"]),
  prices: z.object({
    monthly: z.number().min(0),
    annual: z.number().min(0),
  }),
  adFree: z.boolean(),
  multiplayerAccess: z.boolean(),
  exclusiveContent: z.boolean(),
  offlineDownloads: z.boolean(),
  cloudSaves: z.boolean(),
  active: z.boolean(),
  isRecommended: z.boolean(),
  trialPeriodDays: z.number().min(0),
  fullAccessToAllGames: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;
const CreateSubscription = () => {
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

const navigate = useNavigate();
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: "",
      planType: "Monthly",
      prices: { monthly: 0, annual: 0 },
      adFree: false,
      multiplayerAccess: false,
      exclusiveContent: false,
      offlineDownloads: false,
      cloudSaves: false,
      active: true,
      isRecommended: false,
      trialPeriodDays: 0,
      fullAccessToAllGames: false,  
    },mode:"all"
  });

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  async function onSubmit(data: FormValues) {
    const formData = {
      ...data,
      features,
    };
    
   await createSubscription(formData);
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900  font-bold">
            Create New Subscription
          </CardTitle>
          <CardDescription>
            Set up a new subscription plan with custom features and pricing
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="planName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter plan name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="planType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="font-medium">Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="prices.monthly"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prices.annual"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trialPeriodDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trail Period In Days</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="font-medium">Additional Features</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addFeature} variant="outline">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      {feature}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeFeature(feature)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Toggle Features */}
              <div className="space-y-4">
                <h3 className="font-medium">Plan Features</h3>
                <div className="space-y-4">
                  {[
                    { name: "isRecommended", label: "Recommended" },
                    { name: "adFree", label: "Ad Free" },
                    { name: "multiplayerAccess", label: "Multiplayer Access" },
                    { name: "exclusiveContent", label: "Exclusive Content" },
                    { name: "offlineDownloads", label: "Offline Downloads" },
                    { name: "cloudSaves", label: "Cloud Saves" },
                    {
                      name: "fullAccessToAllGames",
                      label: "Full Access To All Games",
                    },
                  ].map((feature) => (
                    <FormField
                      key={feature.name}
                      control={form.control}
                      name={feature.name as keyof FormValues}
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>{feature.label}</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Status */}
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Active Status</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-end space-x-4 bg-slate-50">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isLoading && (
                  <Loading
                    size={20}
                    color={"white"}
                    transparent={true}
                    fullscreen={false}
                  />
                )}
                Create Subscription
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateSubscription;
