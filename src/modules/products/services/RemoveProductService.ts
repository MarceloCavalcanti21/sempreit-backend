import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
    id: string;
}

@injectable()
class RemoveProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id }: IRequest): Promise<void> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Produto não encontrado');
        }

        await this.productsRepository.remove(id);
    }
}

export default RemoveProductService;
