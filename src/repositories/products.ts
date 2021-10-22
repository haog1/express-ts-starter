import { ProductAttrs, ProductModel } from '../models/product'
import { BaseRepository } from './base'

export class ProductsRepository extends BaseRepository {
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

    return products.map((product: Partial<ProductAttrs>) => product as ProductReturnAttrs)
  }
}
