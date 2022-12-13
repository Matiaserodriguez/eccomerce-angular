import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productListChangedEvent = new Subject<Product[]>();
  products: Product[] = [];
  productChangedEvent = new EventEmitter<Product[]>();
  maxProductId: number;

  constructor(private httpClient: HttpClient) {
    this.maxProductId = this.getMaxId();
   }

  getProducts() {
    this.httpClient.get<{products: Product[]}>("http://localhost:3000/products")
      .subscribe(response => {
        console.log(response.products);
        this.products = response.products ? response.products : [];
        this.sortAndSend();
      });
    
    return this.products.slice();
  }

  getProduct(id: string | undefined): Product | null {
    for (let product of this.products) {
      if (product.id == id) {
        return product;
      }
    }
    return null;
   }
  
  getMaxId(): number {
    let maxId = 0

    for (let product of this.products){
      let currentId = parseInt(product.id);
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }

  
  addProduct(product: Product) {
    if (!product) {
      return;
    }

    // make sure id of the new Product is empty
    product.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.httpClient.post<{ message: string, products: Product }>('http://localhost:3000/products',
      product,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new product to products
          this.products.push(responseData.products);
          this.sortAndSend();
        }
      );
  }

updateProduct(originalProduct: Product | null, newProduct: Product) {
  if (!originalProduct || !newProduct) {
    return;
  }

  const pos = this.products.findIndex(d => d.id === originalProduct.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Product to the id of the old Product
  newProduct.id = originalProduct.id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.httpClient.put('http://localhost:3000/products/' + originalProduct.id,
    newProduct, { headers: headers })
    .subscribe(
      (response) => {
        this.products[pos] = newProduct;
        this.sortAndSend();
      }
    );
}

deleteProduct(product: Product) {

  if (!product) {
    return;
  }

  const pos = this.products.findIndex(d => d.id === product.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.httpClient.delete('http://localhost:3000/products/' + product.id)
    .subscribe(
      (response) => {
        this.products.splice(pos, 1);
        this.sortAndSend();
      }
    );
  }
 
  sortAndSend() {
    this.maxProductId = this.getMaxId();
    this.products.sort((a: Product, b: Product) => {
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    });
    const clonedProducts = this.products.slice()
    this.productListChangedEvent.next(clonedProducts);
  }
}
