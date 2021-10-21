import { IRepository } from './contract'
import { ProductModel, ProductReturnAttrs } from '../models/product'

export class ProductsRepository implements IRepository<ProductReturnAttrs> {
  public async getAll<ProductReturnAttrs>(): Promise<ProductReturnAttrs[]> {
    const products = await ProductModel.findAll({
      attributes: [
        ['guid', 'Id'],
        ['name', 'Name'],
        ['description', 'Description'],
        ['price', 'Price'],
        ['deliveryPrice', 'DeliveryPrice'],
      ],
      where: {
        isDeleted: false,
      },
      raw: true,
    })

    return products as unknown as ProductReturnAttrs[]
  }
  public async getOne<Model>(param: any): Promise<Model> {
    throw new Error('Method not implemented.')
  }
  public async create<Model>(post: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async update<Model>(param: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async delete<Model>(param: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
