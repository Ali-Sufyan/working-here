/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputTypeI } from "../../forms/input.interface";

export interface CRUHeadingI {
  key: string;
  name: string;
  category: string;
  placeholder: string;
  isRawHtml?: boolean;
  unique?: boolean;
  formType:
    | InputTypeI["type"]
    | "select"
  | "select2"
  | "select3"
  
    | "image"
    | "obj"
    | "toggle"
    | "textarea2"
  | "textarea1"
  | "array";
  isToggle: boolean;
  prefixIcons: JSX.Element;
  suffixIcons?: JSX.Element;
  disabled?: boolean;
  required?: boolean;

  show?: boolean;
  useRegex?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kv?: Record<string, any>;
  isKvChild?: boolean;
  child?: CRUHeadingI[];
  
  filter?: {
    childKey: string
    childValue: string
    link: string
    data: Record<string, any>[]
    parentFilterKey?: string,
    arrKey: string
  }
}

export interface CRUCategoriesI {
  name: string;
  key: string;
}

export interface CruI {
  type: "CREATE" | "UPDATE" | "VIEW";

  delete?: {
    delete: (id: string) => void;
    deleteStatus: "error" | "loading" | "success" | "none";
    errorMessage?: any;

    deleteMetaData: string[];
  };
  create?: {
    create: (
      data: any
    ) => Promise<"isLoading" | "isSuccess" | "isError" | "none">;
    createStatus: "error" | "loading" | "success" | "none";
    errorMessage?: any;
  };
  update?: {
    updateStatus?: "error" | "loading" | "success" | "none";
    errorMessage?: any;
    update?: (
      id: any
    ) => Promise<"isLoading" | "isSuccess" | "isError" | "none">;
    updateRoute?: string;
  };
  buttonName?: string;
  showButton?: {
    deleteButton?: boolean;
    updateButton?: boolean;
    createButton?: boolean;
    any?: boolean;
  };
  showHeading?: boolean;
  name: string;
  extraInfo?: string;
  icon: JSX.Element;
  categories: CRUCategoriesI[];
  headings: CRUHeadingI[];
  data: Record<string, any>;
  id: string;
}

export type crudFormT = Pick<
  CruI,
  "name" | "headings" | "categories" | "type" | "data"
>;
