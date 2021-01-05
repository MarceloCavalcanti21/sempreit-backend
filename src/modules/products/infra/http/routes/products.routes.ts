import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

// Esse é o middleware responsável por interceptar as requisições e fazer a verificação de presença e validade do token JWT
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();

// Aqui eu aplico esse middleware a todas as rotas desse arquivo
productsRouter.use(ensureAuthenticated);

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.show);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.remove);

export default productsRouter;
