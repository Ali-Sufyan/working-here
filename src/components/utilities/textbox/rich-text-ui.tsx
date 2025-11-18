/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PresetQuillEditor = ({
  initialValue = "",
  onChange,
}: {
  onChange: (data: any) => void;
  initialValue: string;
}) =>
  useMemo(
    () => (
      <ReactQuill
        theme="snow"
        value={initialValue}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
          },
        }}
        className="h-full w-fit min-h-[100px]"
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
      />
    ),
    [initialValue, onChange]
  );

export default PresetQuillEditor;
