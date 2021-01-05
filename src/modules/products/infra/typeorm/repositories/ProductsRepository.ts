import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '../../../repositories/IProductsRepository';
import ICreateProductDTO from '../../../dtos/ICreateProductDTO';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async create(data: ICreateProductDTO): Promise<Product> {
        const product = this.ormRepository.create(data);

        await this.ormRepository.save(product);

        return product;
    }

    public async save(product: Product): Promise<Product> {
        return this.ormRepository.save(product);
    }

    public async findById(id: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne(id);

        return product;
    }

    public async show(): Promise<Product[] | undefined> {
        const products = await this.ormRepository.find({
            order: {
                description: 'ASC',
            },
        });

        return products;
    }

    public async remove(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}

export default ProductsRepository;
