import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

@injectable()
class ShowProductsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(): Promise<Product[]> {
        const products = await this.productsRepository.show();

        if (!products) {
            throw new AppError('Nenhum produto encontrado');
        }

        return products;
    }
}

export default ShowProductsService;
