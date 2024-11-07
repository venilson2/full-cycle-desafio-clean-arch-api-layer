import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/product.model";
import ProductRepository from "../../../infrastructure/product/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {
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


  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 =  new Product("1", "Test1");
    const product2 =  new Product("2", "Test2");

    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = await usecase.execute();

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
  });
});