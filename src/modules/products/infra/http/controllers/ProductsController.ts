import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProductService from '../../../services/CreateProductService';
import ShowProductsService from '../../../services/ShowProductsService';
import UpdateProductService from '../../../services/UpdateProductService';
import RemoveProductService from '../../../services/RemoveProductService';

export default class ProductsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { description, amount } = request.body;

        const createProduct = container.resolve(CreateProductService);

        const product = await createProduct.execute({
            description,
            amount,
        });

        return response.json(classToClass(product));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const showProduts = container.resolve(ShowProductsService);

        const products = await showProduts.execute();

        return response.json(classToClass(products));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { description, amount } = request.body;

        const updateProduct = container.resolve(UpdateProductService);

        const product = await updateProduct.execute({
            id,
            description,
            amount,
        });

        return response.json(classToClass(product));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const removeProduct = container.resolve(RemoveProductService);

        await removeProduct.execute({
            id,
        });

        return response.status(204).json();
    }
}
