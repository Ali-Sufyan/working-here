export interface CategoryI {
  _id: string;
  name: string;
  image: string;
  createdBy: string;
  updatedBy: string;
}

export interface SubCategoryI {
  _id: string;
  name: string;
  image: string;
  category: string;
  createdBy: string;
  updatedBy: string;
}
