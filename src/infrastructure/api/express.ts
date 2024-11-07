import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../product/product.model";
import { productRoute } from "./routes/product.route";

const app: Express = express();
let sequelize: Sequelize;

app.use(express.json());
app.use('/products', productRoute);

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  });
  sequelize.addModels([ProductModel]);
  await sequelize.sync();
};

setupDb();

export { app, sequelize }