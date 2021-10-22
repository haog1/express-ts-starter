import { IRepository } from './contract'
import { ProductAttrs, ProductModel, ProductReturnAttrs } from '../models/product'

export class ProductsRepository implements IRepository<ProductReturnAttrs> {
  public async getAll<ProductReturnAttrs>(): Promise<ProductReturnAttrs[]> {
    const products = await ProductModel.findAll({
      attributes: [
        ['guid', 'Id'],
        ['name', 'Name'],
        ['description', 'Description'],
        ['price', 'Price'],
        ['delivery_price', 'DeliveryPrice'],
      ],
      where: {
        isDeleted: false,
      },
      raw: true,
    })

    const returnData = products.map((product: Partial<ProductAttrs>) => product as ProductReturnAttrs)
    return returnData
  }
  public async getOne<ProductReturnAttrs>(param: any): Promise<ProductReturnAttrs> {
    throw new Error('Method not implemented.')
  }
  public async create<ProductReturnAttrs>(post: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async update<ProductReturnAttrs>(param: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
  public async delete<ProductReturnAttrs>(param: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
