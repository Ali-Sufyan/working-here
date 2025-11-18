export interface CustomButtonI {
  style: string;
  onClick: () => void;
  button_type: "elevated-button" | "submerged_button";
  children: React.ReactNode;
}
