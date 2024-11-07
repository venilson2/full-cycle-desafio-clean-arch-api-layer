import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../product/product.model";

const app: Express = express();

app.use(express.json());

let sequelize: Sequelize;

async function initializeDatabase(): Promise<Sequelize> {
  const sequelizeInstance = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelizeInstance.addModels([ProductModel]);
  await sequelizeInstance.sync();
  return sequelizeInstance;
}

async function initializeApp() {
  sequelize = await initializeDatabase();
}

initializeApp().catch((error) => {
  console.error("Failed to initialize application:", error);
});

export { app, sequelize };
