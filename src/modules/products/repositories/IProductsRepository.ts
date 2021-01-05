import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../dtos/ICreateProductDTO';

export default interface IUsersRepository {
    create(data: IProductsRepository): Promise<Product>;
    save(product: Product): Promise<Product>;
    findById(id: string): Promise<Product | undefined>;
    show(): Promise<Product[] | undefined>;
    remove(id: string): Promise<void>;
}
