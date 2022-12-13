import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  originalProduct: Product | null;
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
  
  
  onSubmit(form: NgForm) {
    const value = form.value;
    const newProduct = new Product(
      value.id,
      value.name,
      value.imageUrl,
      value.description,
      value.price
    );

    if(this.editMode) {
      this.productService.updateProduct(this.originalProduct, newProduct);
    } else {
      this.productService.addProduct(newProduct)
    }
    this.router.navigate(['products']);
  }

  onCancel() {
    this.router.navigate(['products']);
  }
}
