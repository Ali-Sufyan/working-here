import { useUpdateSubscriptionMutation } from "@/app/services/subscription/query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loading from "@/components/utilities/styles/loading";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const subscriptionSchema = z.object({
  planName: z.string().min(3, "Name must be at least 3 characters"),
  planType: z.enum(["Monthly", "Annual"]),
  prices: z.object({
    monthly: z.number().min(0, "Monthly price must be positive"),
    annual: z.number().min(0, "Annual price must be positive"),
  }),
  features: z.array(z.string()),
  adFree: z.boolean(),
  multiplayerAccess: z.boolean(),
  exclusiveContent: z.boolean(),
  offlineDownloads: z.boolean(),
  cloudSaves: z.boolean(),
  active: z.boolean(), isRecommended: z.boolean(),
    trialPeriodDays: z.number().min(0),
    fullAccessToAllGames: z.boolean(),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

interface AuditFields {
  createdBy: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
  updatedBy: {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionFormProps {
  initialData: SubscriptionFormData & AuditFields & { _id: string };
  onSuccess: () => void;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [updateSubscription,{ isLoading, isError, error, isSuccess}] = useUpdateSubscriptionMutation();

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: initialData || {
      planName: "",
      planType: "Monthly",
      prices: {
        monthly: 0,
        annual: 0,
      },
      features: [],
      adFree: false,
      multiplayerAccess: false,
      exclusiveContent: false,
      offlineDownloads: false,
      cloudSaves: false,
      active: true,
    },
  });
useEffect(() => {
    if (isSuccess) {
        onSuccess();
        successToast("Subscription updated successfully");
        
    }
    if(isError){
        errorToast(typeof error === "string" ? error : typeof error === "object" ? error.message :
            "Failed to update subscription");
    }
}, [isSuccess, onSuccess]);
  async function onSubmit() {
    if (isEdit && initialData) {
      const formValues = form.getValues();

        console.log({formValues})
      try {
        await updateSubscription({
          id: initialData._id,
            features: formValues.features,
            planName: formValues.planName,
            planType: formValues.planType,
            prices: formValues.prices,
            active: formValues.active,
            adFree: formValues.adFree,
            multiplayerAccess: formValues.multiplayerAccess,
            exclusiveContent: formValues.exclusiveContent,
            offlineDownloads: formValues.offlineDownloads,
            cloudSaves: formValues.cloudSaves,
            
        }).unwrap();
        onSuccess();
        setIsEdit(false);
      } catch (error) {
        console.error("Failed to update subscription:", error);
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {isEdit ? "Edit Subscription" : "View Subscription"}
          </CardTitle>
          <Button
            onClick={() => {
              if (isEdit) {
                form.reset();
              }
              setIsEdit(!isEdit);
            }}
          >
            {isEdit ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="planName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEdit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="planType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={!isEdit}
                      className="w-full px-3 py-2 border rounded-md border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Annual">Annual</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="prices.monthly"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        disabled={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prices.annual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        disabled={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value ? "true" : "false"}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                      disabled={!isEdit}
                      className="w-full px-3 py-2 border rounded-md border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="trialPeriodDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trial Period In Days</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEdit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Features Checkboxes */}
            <div className="space-y-4">
              <FormLabel>Features</FormLabel>
              {[
                "adFree",
                "multiplayerAccess",
                "exclusiveContent",
                "offlineDownloads",
                "cloudSaves",
                "fullAccessToAllGames",
                "isRecommended"
              ].map((feature) => (
                <FormField
                  key={feature}
                  control={form.control}
                  name={feature as keyof SubscriptionFormData}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <div className="relative inline-block">
                          <input
                            className="peer w-4 h-4 border border-gray-300 rounded cursor-pointer 
          focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background
          checked:bg-primary checked:border-primary checked:text-primary-foreground
          appearance-none"
                            type="checkbox"
                            checked={!!field.value}
                            onChange={field.onChange}
                            disabled={!isEdit}
                          />
                          <Check
                            className="absolute h-3 w-3 text-white top-0.5 left-0.5 pointer-events-none 
          opacity-0 peer-checked:opacity-100 transition-opacity"
                            strokeWidth={3}
                          />
                        </div>
                      </FormControl>
                      <FormLabel className="cursor-pointer">
                        {feature
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Audit Fields */}
            {initialData && (
              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Created By</p>
                    <p>{initialData.createdBy.lastName}</p>
                    <p>{initialData.createdBy.firstName}</p>
                    <p>{initialData.createdBy.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Updated By</p>
                    <p>{initialData.updatedBy.lastName}</p>
                    <p>{initialData.updatedBy.firstName}</p>
                    <p>{initialData.updatedBy.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Created At</p>
                    <p>{new Date(initialData.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Updated At</p>
                    <p>{new Date(initialData.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {isEdit && (
              <div className="flex justify-end space-x-4">
                <Button type="submit" className="w-32">
              {isLoading&& <Loading
              
                                      size={20}
                                      transparent={true}
                                      fullscreen={false}
                                      color="white"
                                  />}    Save Changes
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SubscriptionForm;
