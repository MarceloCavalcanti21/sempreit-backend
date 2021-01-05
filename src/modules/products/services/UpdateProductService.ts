import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    id: string;
    description: string;
    amount: number;
}

@injectable()
class UpdateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({
        id,
        description,
        amount,
    }: IRequest): Promise<Product> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Produto não encontrado');
        }

        product.description = description;
        product.amount = amount;

        return this.productsRepository.save(product);
    }
}

export default UpdateProductService;
