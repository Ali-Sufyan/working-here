import { useRef, useState } from "react";
import "./zoom.css";
export default function ZoomTool() {
  const body_ref = useRef(document.body);
  const [zoomState, setZoomState] = useState<
    "zoom-minus" | "zoom-plus" | "zoom-plus-plus" | "normal"
  >("normal");

  function currentSize() {
    let current_size = parseFloat(
      window
        .getComputedStyle(body_ref.current, null)
        .getPropertyValue("font-size")
    );

    switch (zoomState) {
      case "zoom-plus":
        return (current_size = current_size / 1.1);

      case "zoom-plus-plus":
        return (current_size = current_size / 1.5);

      case "zoom-minus":
        return (current_size = current_size / 0.8);

      default:
        return current_size;
    }
  }

  function adjustFont(
    zoom_state: "zoom-minus" | "zoom-plus" | "zoom-plus-plus" | "normal"
  ) {
    const current_size = currentSize();

    switch (zoom_state) {
      case "normal":
        body_ref.current.style.fontSize = current_size * 1 + "px";
        setZoomState("normal");
        break;
      case "zoom-minus":
        body_ref.current.style.fontSize = current_size * 0.8 + "px";
        setZoomState("zoom-minus");
        break;
      case "zoom-plus":
        body_ref.current.style.fontSize = current_size * 1.2 + "px";
        setZoomState("zoom-plus");
        break;
      case "zoom-plus-plus":
        body_ref.current.style.fontSize = current_size * 1.5 + "px";
        setZoomState("zoom-plus-plus");
        break;

      default:
        break;
    }
  }

  return (
    <div className="zoom-tool submerged-paper ">
      {" "}
      <div className="zoom-group-icons ">
        <div
          className="zoom-icons elevated-paper bg-[var(--primary-light)] "
          onClick={() => zoomState !== "zoom-minus" && adjustFont("zoom-minus")}
        >
          A-
        </div>
        <div
          className="zoom-icons elevated-paper bg-[var(--primary-dark)] mx-2"
          onClick={() => zoomState !== "normal" && adjustFont("normal")}
        >
          A
        </div>
        <div
          className="zoom-icons elevated-paper bg-[var(--primary-light)] mx-2"
          onClick={() => zoomState !== "zoom-plus" && adjustFont("zoom-plus")}
        >
          A+
        </div>
        <div
          className="zoom-icons elevated-paper bg-[var(--primary-dark)]"
          onClick={() =>
            zoomState !== "zoom-plus-plus" && adjustFont("zoom-plus-plus")
          }
        >
          {" "}
          A++
        </div>
      </div>
    </div>
  );
}
