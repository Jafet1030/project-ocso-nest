import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from "uuid";
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {
   
  }
  private products:CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Normal",
      price: 29,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Coca Cola 600ml",
      price: 40,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 600ml",
      price: 15,
      countSeal: 2,
      provider: uuid(),
    }
  ];
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find(); 
  }

  findOne(id: string) {
    const productFound = this.products.filter((product) => product.provider === id)
    if (productFound.length==0) throw new NotFoundException();
    return productFound;
  }

  findByProvider(id: string) {
    const productFound = this.products.filter((product) => product.provider === id);
    if (productFound.length==0) throw new NotFoundException();
    return productFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    });
    if (!productToUpdate) throw new NotFoundException();
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  async remove(id: string) {
    this.findOne(id);
    this.productRepository.delete({productId:id});
    return `Product with id: ${id} has been deleted`;
  }
}
