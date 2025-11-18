import React from "react";

export interface dashboardListI {
  icon: React.ReactElement;
  name: string;
  onClick: () => void;
  link_to?: string;
  onHover: () => void;
  permission?: {
    permit: string[];
    exclude?: string[];
  };
  children?: dashboardListI[];
}

export interface customDashboardI {
  name: string;
  icon: JSX.Element;
  amount: number;
  metadata?: string;
  children?: string | JSX.Element | JSX.Element[];
  avatar_color: string;
  show_currency: boolean;
  show_chart?: boolean;
  chart?: JSX.Element;
}
