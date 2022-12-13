import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  subscription: Subscription;
  products: Product[] = [];

  constructor(private prodService: ProductService) {}

  ngOnInit(): void {
    this.products = this.prodService.getProducts()
    this.subscription = this.prodService.productListChangedEvent
      .subscribe((productsList: Product[]) => this.products = productsList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
