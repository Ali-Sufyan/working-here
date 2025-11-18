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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, Edit2, Save, X, XCircle } from 'lucide-react';
import { useState } from 'react';

interface SubscriptionPriceI {
  monthly: number;
  annual: number;
}

interface SubscriptionResponseI {
  id: string;
  planName: string;
  planType: "Monthly" | "Annual";
  prices: SubscriptionPriceI;
  features: string[];
  adFree: boolean;
  multiplayerAccess: boolean;
  exclusiveContent: boolean;
  
  offlineDownloads: boolean;
  cloudSaves: boolean;
  createdBy: string;
  updatedBy: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  isRecommended: boolean;
  trialPeriodDays: number;
  fullAccessToAllGames: boolean;
}

const SubscriptionManager = () => {
  const [subscription, setSubscription] = useState<SubscriptionResponseI>({
    id: "1",
    planName: "Premium Plan",
    planType: "Monthly",
    prices: { monthly: 9.99, annual: 99.99 },
    features: ["Premium Support", "High Quality Streaming"],
    adFree: true,
    multiplayerAccess: true,
    exclusiveContent: true,
    offlineDownloads: true,
    cloudSaves: true,
    createdBy: "admin",
    updatedBy: "admin",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    isRecommended: false,
    trialPeriodDays: 0,
    fullAccessToAllGames: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedSubscription, setEditedSubscription] = useState<SubscriptionResponseI>(subscription);

  const handleSave = () => {
    setSubscription(editedSubscription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSubscription(subscription);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              {subscription.planName}
              <Badge 
                className="ml-2" 
                variant={subscription.active ? "default" : "destructive"}
              >
                {subscription.active ? "Active" : "Inactive"}
              </Badge>
            </CardTitle>
            <CardDescription>
              {subscription.planType} Plan - ${subscription.planType === "Monthly" 
                ? subscription.prices.monthly 
                : subscription.prices.annual}/
              {subscription.planType === "Monthly" ? "month" : "year"}
            </CardDescription>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} variant="default">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            {isEditing ? (
              <>
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">Plan Name</label>
                    <Input
                      value={editedSubscription.planName}
                      onChange={(e) => setEditedSubscription({
                        ...editedSubscription,
                        planName: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Plan Type</label>
                    <Select
                      value={editedSubscription.planType}
                      onValueChange={(value: "Monthly" | "Annual") => 
                        setEditedSubscription({
                          ...editedSubscription,
                          planType: value
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                    <div>
                    <label className="text-sm font-medium">Trial Period In Days</label>
                    <Input
                      value={editedSubscription.trialPeriodDays}
                      onChange={(e) => setEditedSubscription({
                        ...editedSubscription,
                        trialPeriodDays: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Ad Free</span>
                    <Switch
                      checked={editedSubscription.adFree}
                      onCheckedChange={(checked) => 
                        setEditedSubscription({
                          ...editedSubscription,
                          adFree: checked
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Multiplayer Access</span>
                    <Switch
                      checked={editedSubscription.multiplayerAccess}
                      onCheckedChange={(checked) => 
                        setEditedSubscription({
                          ...editedSubscription,
                          multiplayerAccess: checked
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Exclusive Content</span>
                    <Switch
                      checked={editedSubscription.exclusiveContent}
                      onCheckedChange={(checked) => 
                        setEditedSubscription({
                          ...editedSubscription,
                          exclusiveContent: checked
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Offline Downloads</span>
                    <Switch
                      checked={editedSubscription.offlineDownloads}
                      onCheckedChange={(checked) => 
                        setEditedSubscription({
                          ...editedSubscription,
                          offlineDownloads: checked
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cloud Saves</span>
                    <Switch
                      checked={editedSubscription.cloudSaves}
                      onCheckedChange={(checked) => 
                        setEditedSubscription({
                          ...editedSubscription,
                          cloudSaves: checked
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Is Recommended</span>
                    <Switch
                      checked={editedSubscription.cloudSaves}
                      onCheckedChange={(checked) => 
                        setEditedSubscription({
                          ...editedSubscription,
                          isRecommended: checked
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Full Access To All Games</span>
                    <Switch
                      checked={editedSubscription.cloudSaves}
                      onCheckedChange={(checked) => 
                        setEditedSubscription({
                          ...editedSubscription,
                      fullAccessToAllGames: checked
                        })
                      }
                    />
                  </div>

                  
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Features</h3>
                    <div className="space-y-2">
                      {[
                        { label: "Ad Free", value: subscription.adFree },
                        { label: "Multiplayer Access", value: subscription.multiplayerAccess },
                        { label: "Exclusive Content", value: subscription.exclusiveContent },
                        { label: "Offline Downloads", value: subscription.offlineDownloads },
                        { label: "Cloud Saves", value: subscription.cloudSaves },
                      ].map((feature) => (
                        <div key={feature.label} className="flex items-center">
                          {feature.value ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500 mr-2" />
                          )}
                          <span>{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <p>Created by: {subscription.createdBy}</p>
                      <p>Updated by: {subscription.updatedBy}</p>
                      <p>Created: {formatDate(subscription.createdAt)}</p>
                      <p>Last updated: {formatDate(subscription.updatedAt)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Additional Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {subscription.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50">
          <p className="text-sm text-slate-500">
            ID: {subscription.id}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionManager;