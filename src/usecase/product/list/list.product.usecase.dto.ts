export interface InputListProductDto {}

type Product = {
  id: string;
  name: string;
};

export interface OutputListProductDto {
  products: Product[];
}