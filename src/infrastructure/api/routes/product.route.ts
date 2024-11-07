import express, {Request, Response} from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {

  try {
    const usecase = new CreateProductUseCase(new ProductRepository());
    const productDto = {
      name: req.body.name
    }
  
    const output = await usecase.execute(productDto);
    res.status(200).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {

  try {
    const usecase = new ListProductUseCase(new ProductRepository());
    const output = await usecase.execute();
    res.status(200).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})