import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { File as FileIcon, Upload, X } from "lucide-react";
import React, { DragEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { formatBytes } from "../utilities/utils";

interface FileUploadProps {
  label: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  files,
  onFilesChange,
  accept = "*/*",
  maxSize = 10 * 1024 * 1024, // 10MB default
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer?.files || []);

    // Filter out files that are too large
    const validFiles = droppedFiles.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`File ${file.name} is too large. Maximum size is ${Math.floor(maxSize / 1024 / 1024)}MB`);
        console.warn(
          `File ${file.name} is too large. Maximum size is ${Math.floor(
            maxSize / 1024 / 1024
          )}MB`
        );
        return false;
      }
      return true;
    });

    onFilesChange([...files, ...validFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    // Filter out files that are too large
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > maxSize) {
        toast.error(`File ${file.name} is too large. Maximum size is ${Math.floor(maxSize / 1024 / 1024)}MB`);
        console.warn(
          `File ${file.name} is too large. Maximum size is ${Math.floor(
            maxSize / 1024 / 1024
          )}MB`
        );
        return false;
      }
      return true;
    });

    onFilesChange([...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full space-y-2">
      <Label>{label}</Label>
      <Card
        className={`p-4 border-2 ${
          isDragActive
            ? "border-primary-dark bg-primary animate-pulse "
            : "border-dashed border-gray-300 hover:border-gray-400"
        } overflow-auto transition-all duration-500 ease-in-out`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          {/* File Input Area */}
          <div className="text-center">
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleFileSelect}
              accept={accept}
              multiple
              id="file-upload"
            />
            <Upload
              className={`mx-auto h-12 w-12 ${
                isDragActive ? "text-primary animate-bounce" : "text-gray-400"
              } transition-all duration-500`}
            />
            <div className="mt-2">
              <Button
                variant="outline"
                className="mt-2"
                onClick={triggerFileInput}
              >
                Choose Files
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                {isDragActive
                  ? "Drop your files here"
                  : "or drag and drop your files here"}
              </p>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded transition-all duration-500 ease-in-out transform hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-2">
                    <FileIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm truncate max-w-xs">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {/* ( {Math.round(file.size / 1024)}KB) */}

                      ({formatBytes(file.size)})
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export { FileUpload };

