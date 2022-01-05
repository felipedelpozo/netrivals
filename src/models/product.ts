import FormulaModel from "@netrivals/models/formula";

export interface ProductModel {
  image: string;
  modelNumber: string;
  name: string;
  regularPrice: number;
  salePrice: number;
  sku: string;
  thumbnailImage: string;
  type: string;
  upc: string;
  url: string;
  equation: FormulaModel | null;
}

export default ProductModel;
