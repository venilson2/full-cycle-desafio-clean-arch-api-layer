import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/product.model";
import ProductRepository from "../../../infrastructure/product/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });


  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product =  new Product("123", "Test");
    await productRepository.create(product);

    const input = {
      id: "123"
    }

    const output = {
      id: "123",
      name: "Test",
    };

    const result = await usecase.execute(input);
    
    expect(result).toEqual(output);
  });
});