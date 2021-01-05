import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    description: string;
    amount: number;
}

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ description, amount }: IRequest): Promise<Product> {
        const product = await this.productsRepository.create({
            description,
            amount,
        });

        return product;
    }
}

export default CreateProductService;
