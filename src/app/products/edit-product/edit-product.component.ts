import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  originalProduct: Product | undefined;
  product: Product | undefined;
  editMode: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];

        if(!id) {
          this.editMode = false;
          return;
        }

        this.originalProduct = this.productService.getProduct(id);

        if (!this.originalProduct) return;

        this.editMode = true;
        this.product = {...this.originalProduct};
      }
    )
  }
  onCancel() {}
  onSubmit(f: any) {
    console.log(f.value);
  }
}
