import { v4 as uuid } from "uuid";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {

    const product = new Product(uuid(), input.name);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
    };
  }
}