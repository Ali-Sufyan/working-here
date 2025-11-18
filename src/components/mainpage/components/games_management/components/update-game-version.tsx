import { GameStatus, IGameVersion } from "@/app/services/games/new-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Loading from "@/components/utilities/styles/loading";
import { parseDateTime } from "@/components/utilities/time-magic";
import { errorToast, warningToast } from "@/components/utilities/toaster";
import { formatBytes } from "@/components/utilities/utils";
import {
  Download,
  Edit,
  GitBranch,
  PlusCircle,
  Save,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";
 // Assuming you're using sonner for toasts



interface GameVersionEditCardProps {
  version: IGameVersion;
  onUpdate: (updatedVersion: IGameVersion & {
    isDraft: boolean;
  }) => Promise<boolean>;
    onDelete?: () => Promise<void>;
    canEdit: boolean;
}

const GameVersionEditCard: React.FC<GameVersionEditCardProps> = ({
  version,
  onUpdate,
    onDelete,
  canEdit = false
  
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVersion, setEditedVersion] = useState<IGameVersion&{isDraft:boolean}>({
    ...version, isDraft:version.status===GameStatus.DRAFT,
  });

const [loading, setLoading] = useState(false);
  
 

  const handleSave = async () => {
    // Validate version before saving
    if (!editedVersion.version.trim()) {
    errorToast("Version cannot be empty");
      return;
    }

    // Remove empty changelog entries
    const cleanedChangelog = editedVersion.changelog.filter(
      (entry) => entry.trim() !== ""
    );

    const updatedVersion = {
      ...editedVersion,
      changelog: cleanedChangelog,
    };

    const c = await onUpdate(updatedVersion);
    setLoading(c);
    setIsEditing(false);
  };

  const handleAddChangelogEntry = () => {
    const hasEmptyEntry = editedVersion.changelog.some(
      (entry) => !entry.trim()
    );

    if (!hasEmptyEntry) {
      setEditedVersion((prev) => ({
        ...prev,
        changelog: [...prev.changelog, ""],
      }));
    } else {
      warningToast("Please fill in the existing empty changelog entry");
    }
  };

  const handleChangelogChange = (index: number, value: string) => {
    const newChangelog = [...editedVersion.changelog];
    newChangelog[index] = value;
    setEditedVersion((prev) => ({
      ...prev,
      changelog: newChangelog,
    }));
  };

  const handleRemoveChangelogEntry = (index: number) => {
    const newChangelog = editedVersion.changelog.filter((_, i) => i !== index);
    setEditedVersion((prev) => ({
      ...prev,
      changelog: newChangelog,
    }));
  };

  return (
    <Card className="max-w-lg mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 pb-4 flex flex-row justify-between items-center">
        <CardTitle className="flex items-center space-x-2">
          <GitBranch className="w-6 h-6 text-purple-600" />
          {isEditing ? (
            <Input
              value={editedVersion.version}
              onChange={(e) =>
                setEditedVersion((prev) => ({
                  ...prev,
                  version: e.target.value,
                }))
              }
              placeholder="Enter version"
              className="w-32"
            />
          ) : (
            <span className="text-xl font-bold text-gray-800">
              Version {version.version}
            </span>
          )}
        </CardTitle>
        <div className="flex items-center space-x-2">
          {loading ? <Loading transparent={true}  size={24} lineWeight={3}/>:  <>
            
            {!isEditing ? (
              <Button
                disabled={!canEdit}
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (canEdit) {
                    setIsEditing(true);
                  } else {
                    errorToast(
                      `game status is ${String(version.status)
                        .split("_")
                        .join(" ")} and cannot be edited`
                    );
                  }
                }}
                title="Edit Version"
              >
                <Edit className="w-5 h-5 text-gray-600" />
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  title="Save Changes"
                >
                  <Save className="w-5 h-5 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(false)}
                  title="cancel Changes"
                >
                  <X className="w-5 h-5 text-red-600" />
                </Button>
              </>
            )}
         </>}
          {onDelete && !isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              title="Delete Version"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{ isEditing?'': 'Status'}</Label>
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editedVersion.isDraft}
                  onCheckedChange={(checked) =>
                    setEditedVersion((prev) => ({
                      ...prev,
                      isDraft: checked,
                    }))
                  }
                />
                <Label>{"Draft Mode"}</Label>
              </div>
            ) : (
              <Badge variant={version.status ===GameStatus.DRAFT ? "default" : "secondary"}>
                {String(version.status).split("_").join(" ")}
              </Badge>
            )}
          </div>
          <div className="space-y-2">
            <Label>Release Notes</Label>
            {isEditing ? (
              <Input
                value={editedVersion.releaseNotes}
                onChange={(e) =>
                  setEditedVersion((prev) => ({
                    ...prev,
                    releaseNotes: e.target.value,
                  }))
                }
                placeholder="Enter release notes"
              />
            ) : (
              <p className="text-sm text-gray-600">
                {version.releaseNotes || "No release notes"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Version Visibility</Label>
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editedVersion.isPublic}
                  onCheckedChange={(checked) =>
                    setEditedVersion((prev) => ({
                      ...prev,
                      isPublic: checked,
                    }))
                  }
                />
                <Label>{editedVersion.isPublic ? "Public" : "Private"}</Label>
              </div>
            ) : (
              <Badge variant={version.isPublic ? "default" : "secondary"}>
                {version.isPublic ? "Public" : "Private"}
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Changelog</Label>
          {isEditing ? (
            <div className="space-y-2">
              {editedVersion.changelog.map((change, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={change}
                    onChange={(e) =>
                      handleChangelogChange(index, e.target.value)
                    }
                    placeholder={`Changelog entry ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveChangelogEntry(index)}
                    title="Remove Entry"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={handleAddChangelogEntry}
                className="w-full"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Changelog Entry
              </Button>
            </div>
          ) : (
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {version.changelog.length > 0 ? (
                version.changelog.map((change, index) => (
                  <li key={index}>{change}</li>
                ))
              ) : (
                <li className="text-gray-500">No changelog entries</li>
              )}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div className="space-y-1">
            <Label>Published</Label>
            <p className="text-sm text-gray-600">
              {parseDateTime(version.publishedAt).date}{" "}
              {parseDateTime(version.publishedAt).time}
            </p>
          </div>
          <div className="space-y-1">
            <Label>Size</Label>
            <p className="text-sm text-gray-600">{formatBytes(version.size)}</p>
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <a
            href={version.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameVersionEditCard;
