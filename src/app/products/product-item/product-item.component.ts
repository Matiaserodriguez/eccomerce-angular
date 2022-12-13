import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
 @Input() product: Product | null;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onDelete(id: string | undefined){
    this.product = this.productService.getProduct(id);
    if (this.product){
      this.productService.deleteProduct(this.product);
    }
    this.router.navigate(['/products']);
  }
}
