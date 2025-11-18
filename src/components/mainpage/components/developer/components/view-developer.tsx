import { IDeveloperProfileFull } from "@/app/slices/branded/dev-profile/dev.profile.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Briefcase,
  Edit,
  Globe,
  Link as LinkIcon,
  Plus,
  Save,
  Star,
  User,
  X
} from "lucide-react";
import React, { useState } from "react";

interface DeveloperProfileProps {
  developerProfile: IDeveloperProfileFull;
  onUpdate?: (updatedProfile: Partial<IDeveloperProfileFull>) => void;
  isEditable?: boolean;
}

const DeveloperProfile: React.FC<DeveloperProfileProps> = ({
  developerProfile,
  onUpdate,
  isEditable = false,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProfile, setEditedProfile] =
    useState<Partial<IDeveloperProfileFull>>(developerProfile);

  const handleFieldChange = (
    field: keyof IDeveloperProfileFull,
    value: string | number | string[]
  ) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedProfile);
      setIsEditMode(false);
    }
  };

  return (
    <div className="max-w-4xl  mx-auto p-4">
      <Card className="space-y-9">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Briefcase className="mr-2 text-primary" />
            Developer Profile
          </CardTitle>
          {isEditable && !isEditMode && (
            <Button variant="outline" onClick={() => setIsEditMode(true)}>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={editedProfile.companyName || ""}
                    onChange={(e) =>
                      handleFieldChange("companyName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Website</Label>
                  <Input
                    value={editedProfile.website || ""}
                    onChange={(e) =>
                      handleFieldChange("website", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Portfolio URLs</Label>
                {editedProfile.portfolioUrls?.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={url}
                      onChange={(e) => {
                        const newUrls = [
                          ...(editedProfile.portfolioUrls || []),
                        ];
                        newUrls[index] = e.target.value;
                        handleFieldChange("portfolioUrls", newUrls || []);
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        const newUrls = editedProfile.portfolioUrls?.filter(
                          (_, i) => i !== index
                        );
                        handleFieldChange("portfolioUrls", newUrls || []);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleFieldChange("portfolioUrls", [
                      ...(editedProfile.portfolioUrls || []),
                      ""
                    ])
                  }
                >
                  <Plus className="mr-2 h-4 w-4" /> Add URL
                </Button>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-2">
                  <User className="mr-2 text-primary" /> User Details
                </h3>
                <div className="space-y-1 flex flex-col items-start ">
                  <p>
                    <strong>Name:</strong> {developerProfile.userId?.firstName}{" "}
                    {developerProfile.userId?.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {developerProfile.userId?.email}
                  </p>
                  <p>
                    <strong>Username:</strong>{" "}
                    {developerProfile.userId?.username}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center mb-2">
                  <Briefcase className="mr-2 text-primary" /> Developer Details
                </h3>
                <div className="space-y-1">
                  <p className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <strong>Company:</strong> {developerProfile.companyName}
                  </p>
                  <p className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    <strong>Website:</strong> {developerProfile.website}
                  </p>
                  <p className="flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    <strong>Rating:</strong> {developerProfile.developerRating}
                    /5
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-2">
                <Badge variant="secondary">
                  Verification: {developerProfile.verificationStatus}
                </Badge>
                <Badge variant="outline">
                  Commission: {developerProfile.commissionRate}%
                </Badge>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Portfolio URLs</h3>
                <div className="space-y-1">
                  {developerProfile.portfolioUrls?.map((url, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline block"
                          >
                            {url}
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Open Portfolio Link</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperProfile;
