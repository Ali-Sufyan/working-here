/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateGameVersionMutation } from "@/app/services/games/query";
import { useAppSelector } from "@/app/slices/hooks";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Loading from "@/components/utilities/styles/loading";
import { errorToast, successToast } from "@/components/utilities/toaster";
import { Save } from "lucide-react";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

// Type Definitions
interface GameVersionData {
  version: string;
  releaseNotes: string;
  isPublic: boolean;
  changelog: string[];
  gameFile?: File;
  isDraft?: boolean;
}

// Validation Schema
const gameVersionSchema = z.object({
  version: z
    .string()
    .min(3, "Version must be at least 3 characters")
    .regex(/^\d+\.\d+\.\d+$/, "Version must be in format X.Y.Z"),
  releaseNotes: z
    .string()
    .min(10, "Release notes must be at least 10 characters"),
  isPublic: z.boolean(),
  changelog: z
    .array(z.string().min(1, "Changelog entry cannot be empty"))
    .min(1, "At least one changelog entry is required"),
  gameFile: z.instanceof(File, { message: "Game file is required" }),
});

export const CreateGameVersion: React.FC = () => {
  const saveTimeoutRef = useRef<any>(null);

  const { id: gameId } = useParams();
  const uploadProgress = useAppSelector(
    (state) => state.gameUpload.gameVersionUploadProgress
  );

  const [createVersion, { isLoading, isError, error, isSuccess }] =
    useCreateGameVersionMutation();

    function handleUploadProgress () {
      console.log("uploadProgress", uploadProgress)
    if (isLoading) {
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
    if (isSuccess) {
      successToast("Game created successfully");
    }

    if (isError) {
      if (typeof error === "string") {
        errorToast(error || "An error occurred while saving your game");
      } else {
        errorToast(error?.data?.message);
      }
    }
  }, [error, isError, isSuccess]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameVersionData, setGameVersionData] = useState<GameVersionData>({
    version: "",
    releaseNotes: "",
    isPublic: false,
    changelog: [""],
    gameFile: undefined,
    isDraft: true,
  });

  const handleInputChange = useCallback(
    (field: keyof GameVersionData, value: any) => {
      setGameVersionData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleFileUpload = useCallback(
    (files: File[]) => {
      if (files.length > 1) {
        errorToast("Only one file is allowed");
        return;
      }

      const file = files[0];
      const maxSize = 100 * 1024 * 1024; // 100 MB

      if (file && file.size > maxSize) {
        errorToast(`File size exceeds ${maxSize / (1024 * 1024)} MB limit`);
        return;
      }

      handleInputChange("gameFile", file);
    },
    [handleInputChange]
  );

  const addChangelogEntry = useCallback(() => {
    setGameVersionData((prev) => ({
      ...prev,
      changelog: [...prev.changelog, ""],
    }));
  }, []);

  const updateChangelogEntry = useCallback((index: number, value: string) => {
    setGameVersionData((prev) => {
      const newChangelog = [...prev.changelog];
      newChangelog[index] = value;
      return { ...prev, changelog: newChangelog };
    });
  }, []);

  const removeChangelogEntry = useCallback((index: number) => {
    setGameVersionData((prev) => ({
      ...prev,
      changelog: prev.changelog.filter((_, i) => i !== index),
    }));
  }, []);

  const validateForm = useCallback(() => {
    try {
      gameVersionSchema.parse(gameVersionData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) =>
          errorToast(err.message, { position: "top-right" })
        );
      }
      return false;
    }
  }, [gameVersionData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        setIsSubmitting(false);
        const formData = new FormData();
        formData.append("version", gameVersionData.version);
        formData.append("releaseNotes", gameVersionData.releaseNotes || "");
        formData.append("isPublic", gameVersionData.isPublic.toString());
        formData.append("changelog", JSON.stringify(gameVersionData.changelog));
        formData.append("isDraft", String(gameVersionData.isDraft || true));
        if (gameVersionData.gameFile) {
          formData.append("gameFile", gameVersionData.gameFile);
          formData.append("size", gameVersionData.gameFile.size.toString());
        }

        // Implement your API call here
        await createVersion({ gameId, file: formData });

        //   toast.success("Game version created successfully");
        //   navigate("/games");
      } catch (error) {
        errorToast("Failed to create game version");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 3000);
  }, [
    createVersion,
    gameId,
    gameVersionData.changelog,
    gameVersionData.gameFile,
    gameVersionData.isDraft,
    gameVersionData.isPublic,
    gameVersionData.releaseNotes,
    gameVersionData.version,
    validateForm,
  ]);

  const cancelSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
      setIsSubmitting(false);
    }
  };

  const isAddChangelogDisabled = useMemo(
    () => gameVersionData.changelog.some((entry) => entry.trim() === ""),
    [gameVersionData.changelog]
  );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create Game Version
        </h1>

        {/* Version Information */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Version Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="version" className="block mb-2">
                Version
              </Label>
              <input
                id="version"
                type="text"
                value={gameVersionData.version}
                onChange={(e) => handleInputChange("version", e.target.value)}
                placeholder="e.g., 1.0.0"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="releaseNotes" className="block mb-2">
                Release Notes
              </Label>
              <textarea
                id="releaseNotes"
                value={gameVersionData.releaseNotes}
                onChange={(e) =>
                  handleInputChange("releaseNotes", e.target.value)
                }
                placeholder="Describe key changes in this version"
                className="w-full px-3 py-2 border bg-transparent  rounded-md"
                rows={3}
              />
            </div>
          </div>
        </section>
        <section className="mb-6">
          <div className="text-xl font-semibold mb-4">Public</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex align-middle gap-2 place-items-center flex-row ">
              <Label htmlFor="isPublic" className="">
                <TooltipProvider>
                  <Tooltip>
                    {" "}
                    <>
                      <TooltipTrigger style={{ background: "transparent" }}>
                        public
                      </TooltipTrigger>
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
                        Public mode allows you to publish <br /> your changes to
                        the public.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Switch
                checked={gameVersionData.isPublic}
                id="isPublic"
                onCheckedChange={(checked) => {
                  handleInputChange("isPublic", checked);
                }}
              />
            </div>

            <TooltipProvider>
              <Tooltip>
                <div className="flex align-middle gap-2 place-items-center flex-row">
                  <Label htmlFor="draft" className="">
                    <TooltipTrigger style={{ background: "transparent" }}>
                      Draft Mode
                    </TooltipTrigger>
                  </Label>
                  <Switch
                    id="draft"
                    checked={gameVersionData.isDraft}
                    onCheckedChange={(e) => handleInputChange("isDraft", e)}
                  />
                </div>
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
                    <br /> publishing them or sending them for review.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>

        {/* Changelog */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Changelog</h2>
          {gameVersionData.changelog.map((entry, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={entry}
                onChange={(e) => updateChangelogEntry(index, e.target.value)}
                placeholder={`Change ${index + 1}`}
                className="flex-grow px-3 py-2 border rounded-md mr-2"
              />
              <Button
                variant={"destructive"}
                onClick={() => removeChangelogEntry(index)}
                className=""
              >
                Remove
              </Button>
            </div>
          ))}
          <button
            onClick={addChangelogEntry}
            disabled={isAddChangelogDisabled}
            className={`mt-2 px-4 py-2 rounded ${
              isAddChangelogDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Add Changelog Entry
          </button>
        </section>

        {/* File Upload */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Game Files</h2>

          <FileUpload
            label="Upload Game Files"
            files={gameVersionData.gameFile ? [gameVersionData.gameFile] : []}
            accept=".zip,.rar,.7z"
            maxSize={100 * 1024 * 1024}
            onFilesChange={(files) => {
              if (files.length > 1) {
                errorToast("Only one file is allowed");
                return;
              }
              handleFileUpload(files);
            }}
          />
        </section>

        {/* Submission Controls */}
        <div className="flex justify-end space-x-4">
          <Button
            onClick={() => cancelSave()}
            variant="outline"
            disabled={!isSubmitting}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded relative ${
              isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Loading size={24} transparent={true} lineWeight={5} />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSubmitting ? (
                <div className="flex align-bottom place-items-baseline">
                  Saving{" "}
                  <Loading type="line" transparent={true} color="white" lineWeight={4} size={12} />
                </div>
              ) : (
                "Create Version"
              )}
            </div>
            <Progress
              value={handleUploadProgress()}
              className="w-full   absolute bottom-[-1px]"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateGameVersion;
