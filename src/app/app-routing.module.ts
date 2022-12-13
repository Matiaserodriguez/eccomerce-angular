import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { 
    path: '',  redirectTo: '/products', pathMatch: 'full'
  },
  { 
    path: 'products', component: ProductsComponent, children: [
      {
        path: 'new', component: EditProductComponent
      },
      // {
      //     path: ':id', component: ProductDetailComponent
      // },
      {
          path: ':id/edit', component: EditProductComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
